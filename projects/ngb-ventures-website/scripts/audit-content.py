# Site-wide editorial & SEO audit over an exported build.
# Usage: pip install pyspellchecker; python3 scripts/audit-content.py <export>/site /dev/null audit.json
import os, re, sys, json, collections, html
from html.parser import HTMLParser
from spellchecker import SpellChecker
ROOT=sys.argv[1]; BASE='/claude-skills/'
BANNED=['extraordinary','exceptional','unparalleled','revolutionary','world-class','world class','cutting-edge','seamless','unmatched','best-in-class','game-changing','game changer','leverage','synergy','one-stop','delve','elevate','unlock','tapestry','bespoke']
US={'color':'colour','colors':'colours','colored':'coloured','organize':'organise','organization':'organisation','customize':'customise','customized':'customised','customization':'customisation','favorite':'favourite','analyze':'analyse','labor':'labour','behavior':'behaviour','fiber':'fibre','fibers':'fibres','gray':'grey','jewelry':'jewellery','mold':'mould','molded':'moulded','catalog':'catalogue','center':'centre','centers':'centres','license':'licence (noun)','defense':'defence','program':'programme','programs':'programmes','realize':'realise','recognize':'recognise','prioritize':'prioritise','optimize':'optimise','optimized':'optimised','standardize':'standardise','standardized':'standardised','minimize':'minimise','utilize':'use','neighbor':'neighbour','flavor':'flavour','flavors':'flavours','harbor':'harbour','traveling':'travelling','modeling':'modelling','canceled':'cancelled','enroll':'enrol','fulfill':'fulfil','gage':'gauge','aluminum':'aluminium','tire':'tyre','pajamas':'pyjamas','cozy':'cosy','mustache':'moustache'}
class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True); s.stack=[]; s.inmain=0; s.skip=0; s.text=[]; s.heads=[]; s.cur=None; s.meta={}; s.title=''; s.intitle=False; s.links=[]; s.imgs=[]; s.svgimg=[]; s.ld=[]; s.inld=False
    def handle_starttag(s,t,a):
        a=dict(a)
        if t=='main': s.inmain+=1
        if t in('script','style','noscript'): s.skip+=1; s.inld = t=='script' and a.get('type')=='application/ld+json'
        if t=='title': s.intitle=True
        if t=='meta':
            k=a.get('name') or a.get('property'); 
            if k: s.meta[k]=a.get('content','')
        if t=='link' and a.get('rel')=='canonical': s.meta['canonical']=a.get('href')
        if t in('h1','h2','h3','h4'): s.cur=[t,'',s.inmain>0]
        if t=='a' and a.get('href'): s.links.append(a['href'])
        if t=='img': s.imgs.append((a.get('src'),a.get('alt')))
        if t=='svg' and a.get('role')=='img': s.svgimg.append(a.get('aria-label'))
        if t in('p','li','h1','h2','h3','h4','dd','dt','figcaption','td','th','br','div','section') and s.inmain: s.text.append('\n')
    def handle_endtag(s,t):
        if t=='main': s.inmain-=1
        if t in('script','style','noscript'): s.skip-=1; s.inld=False
        if t=='title': s.intitle=False
        if s.cur and t==s.cur[0]: s.heads.append((s.cur[0],s.cur[1].strip(),s.cur[2])); s.cur=None
    def handle_data(s,d):
        if s.inld: s.ld.append(d); return
        if s.intitle: s.title+=d
        if s.skip: return
        if s.cur is not None: s.cur[1]+=d
        if s.inmain: s.text.append(d)
sp=SpellChecker()
allow=set(open(sys.argv[2]).read().split()) if len(sys.argv)>2 else set()
pages={}; issues=collections.defaultdict(list); sent_pages=collections.defaultdict(set)
files=[]
for dp,_,fs in os.walk(ROOT):
    for f in fs:
        if f.endswith('.html'): files.append(os.path.join(dp,f))
exists=set(os.path.relpath(f,ROOT) for f in files)
unknown=collections.Counter(); unknown_where=collections.defaultdict(set)
for f in sorted(files):
    rel='/'+os.path.relpath(f,ROOT).replace('index.html','').replace('.html','')
    raw=open(f,encoding='utf-8').read()
    if 'http-equiv="refresh"' in raw: continue
    p=P(); p.feed(raw)
    text=html.unescape(''.join(p.text)); text=re.sub(r'[ \t]+',' ',text)
    I=issues[rel]
    h1=[h for h in p.heads if h[0]=='h1']
    if len(h1)!=1: I.append(f'H1 count = {len(h1)}')
    d=p.meta.get('description','')
    if not d: I.append('missing meta description')
    elif not 70<=len(d)<=160: I.append(f'meta description length {len(d)}')
    if not 20<=len(p.title)<=65: I.append(f'title length {len(p.title)}: {p.title}')
    if not p.meta.get('canonical') and rel not in('/404','/thank-you','/search','/links'): I.append('missing canonical')
    if not p.meta.get('og:image'): I.append('missing og:image')
    for src,alt in p.imgs:
        if alt is None: I.append(f'img without alt: {src}')
    for lab in p.svgimg:
        if not lab: I.append('svg role=img without aria-label')
    # headings: title case / exclamation
    for tag,h,inm in p.heads:
        w=[x for x in re.findall(r"[A-Za-z][A-Za-z'’&-]*",h)]
        if len(w)>=4:
            caps=[x for x in w[1:] if x[0].isupper() and x.lower() not in('india','india’s',"india's",'gi','oem','odm','moq','dobe','us','uk','eu','ngb','ventures','incoterms','amazon','fba','pune','jaipur','moradabad','kannauj','darjeeling','assam','kerala','sanganer','bagru','kutch','i')]
            if len(caps)>=max(2,len(w[1:])*0.5) and not re.search(r'\b(Uttar|Tamil|West|Andhra|Madhya|Jammu)\b',h): I.append(f'title-case heading <{tag}>: {h}')
    # text checks
    low=text.lower()
    for b in BANNED:
        for m in re.finditer(r'\b'+re.escape(b)+r'\b',low): I.append(f'banned/hype word "{b}": …{text[max(0,m.start()-40):m.end()+40].strip()}…'.replace('\n',' '))
    for w in re.findall(r"\b[a-zA-Z]+\b",text):
        lw=w.lower()
        if lw in US and not re.search(r'jewelry-accessories',lw): I.append(f'US spelling "{w}" → {US[lw]}')
    for m in re.finditer(r'[a-z][.!?][A-Z][a-z]|\s[,.;:!?](?!\d)|  +|\.\.(?!\.)|,,',text):
        ctx=text[max(0,m.start()-30):m.end()+30].replace('\n',' ')
        if '  ' in m.group(0) : continue
        I.append(f'punctuation/spacing: …{ctx}…')
    for m in re.finditer(r'\b(\w+) \1\b',text,re.I):
        if m.group(1).lower() not in('that','had','is','very','bye','ha','no'): I.append(f'repeated word: "{m.group(0)}"')
    # spelling
    words=set(re.findall(r"\b[a-z][a-z']{2,}\b",text))
    for w in sp.unknown([w for w in words if "'" not in w and w not in allow]):
        unknown[w]+=1; unknown_where[w].add(rel)
    # sentences for repetition
    for s_ in re.split(r'(?<=[.!?])\s+|\n',text):
        s_=s_.strip()
        if len(s_.split())>=8: sent_pages[s_].add(rel)
    # internal links
    for h in p.links:
        if h.startswith(BASE):
            path=h[len(BASE):].split('#')[0].split('?')[0]
            cand=[path+'.html', path.rstrip('/')+'/index.html', path] if path else ['index.html']
            if path.endswith(('.xml','.txt','.svg','.png','.js')): continue
            if not any(c in exists for c in cand) and not os.path.exists(os.path.join(ROOT,path)): I.append(f'broken internal link: {h}')
    pages[rel]={'title':p.title,'desc':d,'h1':[h[1] for h in h1],'heads':len(p.heads),'words':len(text.split())}
# duplicates
tc=collections.Counter(v['title'] for v in pages.values()); dc=collections.Counter(v['desc'] for v in pages.values())
for r,v in pages.items():
    if tc[v['title']]>1: issues[r].append(f'duplicate title: {v["title"]}')
    if v['desc'] and dc[v['desc']]>1: issues[r].append('duplicate meta description')
rep=sorted([(len(pg),s) for s,pg in sent_pages.items() if len(pg)>=4],reverse=True)
json.dump({'pages':pages,'issues':issues,'unknown':{w:sorted(unknown_where[w])[:5] for w,c in unknown.most_common()},'repeated':rep},open(sys.argv[3] if len(sys.argv)>3 else 'audit.json','w'),indent=1)
n=sum(len(v) for v in issues.values())
print('pages',len(pages),'issues',n,'unknown-words',len(unknown),'repeated-sentences(>=4 pages)',len(rep))
cat=collections.Counter(re.sub(r'[:"].*','',i) for v in issues.values() for i in v)
for k,v in cat.most_common(): print(f'  {v:4} {k}')
