import struct

def read_pool(data):
    assert data[:4] == b'\xca\xfe\xba\xbe'
    n = struct.unpack_from('>H', data, 8)[0]
    entries = [None] * n
    pos = 10; i = 1
    while i<n:
        tag=data[pos]; pos+=1
        if tag==1:
            size=struct.unpack_from('>H',data,pos)[0]; pos+=2
            value=data[pos:pos+size];pos+=size
        elif tag in (3,4): value=data[pos:pos+4];pos+=4
        elif tag in (5,6): value=data[pos:pos+8];pos+=8
        elif tag in (7,8,16,19,20): value=struct.unpack_from('>H',data,pos)[0];pos+=2
        elif tag in (9,10,11,12,17,18): value=struct.unpack_from('>HH',data,pos);pos+=4
        elif tag==15: value=struct.unpack_from('>BH',data,pos);pos+=3
        else: raise ValueError(f'Unknown tag {tag} at {pos}')
        entries[i]=(tag,value);i+=2 if tag in (5,6) else 1
    return entries,pos

def utf(pool,index):return pool[index][1].decode('utf8',errors='replace')
def references(data):
    pool,_=read_pool(data)
    result=[]
    for e in pool[1:]:
        if e and e[0] in (9,10,11):
            cls,nt=e[1];name,desc=pool[nt][1]
            result.append((e[0],utf(pool,pool[cls][1]),utf(pool,name),utf(pool,desc)))
    return sorted(set(result))
def rewrite_utf(data,mapping):
    pool,end=read_pool(data);out=bytearray(data[:10]);counts={}
    for e in pool[1:]:
        if e is None:continue
        tag,val=e;out.append(tag)
        if tag==1:
            for old,new in mapping.items():
                if val==old.encode('utf8'):
                    val=new.encode('utf8');counts[old]=counts.get(old,0)+1;break
            out.extend(struct.pack('>H',len(val)));out.extend(val)
        elif tag in (3,4,5,6):out.extend(val)
        elif tag in (7,8,16,19,20):out.extend(struct.pack('>H',val))
        elif tag in (9,10,11,12,17,18):out.extend(struct.pack('>HH',*val))
        elif tag==15:out.extend(struct.pack('>BH',*val))
    out.extend(data[end:]);return bytes(out),counts
