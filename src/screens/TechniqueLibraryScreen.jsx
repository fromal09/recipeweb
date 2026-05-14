/** TechniqueLibraryScreen.jsx — browse and detail view for cooking techniques */
import { useState } from "react";
import { P } from "../constants/theme.js";
import { TECHNIQUES, TECHNIQUE_META, TECHNIQUE_CATS, DIFF_LABELS, fmtTime } from "../data/techniques.js";
import { Card, SL, SH, Nana } from "../components/primitives.jsx";

export function TechniqueLibraryScreen({ onBack, initialId }) {
  const [cat, setCat]           = useState("all");
  const [selected, setSelected] = useState(initialId || null);
  const [sortBy, setSortBy]     = useState(null);     // null|'difficulty'|'time'|'commonUse'
  const [diffFilter, setDiffFilter] = useState('all');

  const getMeta = id => TECHNIQUE_META[id] || {d:2,t:15,u:5,steps:[]};
  const getTech = id => ({...TECHNIQUES[id], ...getMeta(id)});

  // ── Detail view ──────────────────────────────────────────────────────────
  if (selected && TECHNIQUES[selected]) {
    const t  = getTech(selected);
    const [diffIcon, diffLabel] = DIFF_LABELS[t.d] || ['🟡','Moderate'];
    return (
      <div style={{width:"100%",height:"100%",background:P.parchment,overflowY:"auto"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`,padding:"18px 20px 22px"}}>
          <button onClick={()=>setSelected(null)}
            style={{background:"none",border:"none",color:P.goldLt,fontFamily:"'Caveat',cursive",fontSize:16,cursor:"pointer",marginBottom:10,display:"block"}}>
            ← All Techniques
          </button>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:46}}>{t.icon}</span>
            <div>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:P.parchmentLt,margin:"0 0 5px",lineHeight:1.1}}>{t.name}</h1>
              <p style={{fontFamily:"'Caveat',cursive",fontStyle:"italic",fontSize:15,color:P.goldLt,margin:0}}>{t.summary}</p>
            </div>
          </div>
          {/* Badges */}
          <div style={{display:"flex",gap:8,marginTop:14}}>
            <span style={{background:`${P.parchment}22`,border:`1px solid ${P.goldLt}55`,borderRadius:20,padding:"4px 12px",fontFamily:"'Caveat',cursive",fontSize:13,color:P.parchmentLt}}>
              {diffIcon} {diffLabel}
            </span>
            <span style={{background:`${P.parchment}22`,border:`1px solid ${P.goldLt}55`,borderRadius:20,padding:"4px 12px",fontFamily:"'Caveat',cursive",fontSize:13,color:P.parchmentLt}}>
              ⏱ {fmtTime(t.t)}
            </span>
            <span style={{background:`${P.parchment}22`,border:`1px solid ${P.goldLt}55`,borderRadius:20,padding:"4px 12px",fontFamily:"'Caveat',cursive",fontSize:13,color:P.parchmentLt}}>
              ⭐ {t.u}/10
            </span>
          </div>
        </div>

        <div style={{padding:20}}>
          {/* Step by step */}
          {t.steps && t.steps.length > 0 && (
            <Card style={{marginBottom:18}}>
              <SL>Step by step:</SL>
              {t.steps.map((step,i)=>(
                <div key={i} style={{display:"flex",gap:12,marginBottom:i<t.steps.length-1?12:0,alignItems:"flex-start"}}>
                  <div style={{
                    width:24,height:24,borderRadius:"50%",background:P.rust,
                    flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1
                  }}>
                    <span style={{fontSize:11,color:"#fff",fontWeight:700,fontFamily:"'Playfair Display',serif"}}>{i+1}</span>
                  </div>
                  <p style={{margin:0,fontSize:13.5,color:P.brownDk,lineHeight:1.7,fontFamily:"'Lora',serif"}}>{step}</p>
                </div>
              ))}
            </Card>
          )}

          {/* What it is */}
          <Card>
            <SL>What it is:</SL>
            <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:14.5,color:P.brownDk,lineHeight:1.78,margin:0}}>{t.what}</p>
          </Card>

          {/* When to use */}
          <div style={{marginTop:18}}>
            <SH>When to use it</SH>
            <p style={{fontFamily:"'Lora',serif",fontSize:14,color:P.brownDk,lineHeight:1.7,margin:0}}>{t.when}</p>
          </div>

          {/* Common mistakes */}
          <div style={{marginTop:18}}>
            <SH>Common mistakes</SH>
            {t.mistakes.map((m,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:`${P.rust}22`,border:`1.5px solid ${P.rust}55`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>
                  <span style={{fontSize:11,color:P.rust,fontWeight:700}}>!</span>
                </div>
                <p style={{margin:0,fontSize:13.5,color:P.brownMid,lineHeight:1.65,fontFamily:"'Lora',serif"}}>{m}</p>
              </div>
            ))}
          </div>

          {/* Cuisines */}
          <div style={{marginTop:18}}>
            <SH>Cuisines that rely on it</SH>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {t.cuisines.map(c=>(
                <span key={c} style={{background:P.brownDk,color:P.parchmentLt,padding:"5px 13px",borderRadius:16,fontFamily:"'Caveat',cursive",fontSize:14,fontWeight:600}}>{c}</span>
              ))}
            </div>
          </div>

          {/* Nana note */}
          {t.nanaNote && (
            <div style={{background:`${P.sage}15`,border:`1.5px dashed ${P.sageMid}`,borderRadius:12,padding:"14px 16px",marginTop:20,display:"flex",gap:12,alignItems:"flex-start"}}>
              <Nana size={56}/>
              <p style={{margin:0,fontFamily:"'Caveat',cursive",fontSize:16.5,color:P.sage,lineHeight:1.55,fontStyle:"italic"}}>"{t.nanaNote}"</p>
            </div>
          )}
          <div style={{height:24}}/>
        </div>
      </div>
    );
  }

  // ── Browse view ──────────────────────────────────────────────────────────
  const allTechs = Object.entries(TECHNIQUES);
  let displayTechs = cat === 'all' ? allTechs : allTechs.filter(([,t])=>t.cat===cat);
  if (diffFilter !== 'all') displayTechs = displayTechs.filter(([id])=>getMeta(id).d===diffFilter);
  if (sortBy) {
    displayTechs = [...displayTechs].sort(([a],[b])=>{
      const ma=getMeta(a), mb=getMeta(b);
      if(sortBy==='difficulty') return ma.d - mb.d;
      if(sortBy==='time')       return ma.t - mb.t;
      if(sortBy==='commonUse')  return mb.u - ma.u;
      return 0;
    });
  }

  const SORT_OPTS = [
    {id:'commonUse', label:'⭐ Most Used'},
    {id:'time',      label:'⏱ Quickest'},
    {id:'difficulty',label:'🎯 Difficulty'},
  ];
  const DIFF_OPTS = [
    {id:'all', label:'All'},
    {id:1,     label:'🟢 Easy'},
    {id:2,     label:'🟡 Moderate'},
    {id:3,     label:'🔴 Advanced'},
  ];
  const CATS_WITH_ALL = [{id:'all',label:'All',icon:'📚'}, ...TECHNIQUE_CATS];

  const chipBase = {
    flex:"0 0 auto",border:"1.5px solid",borderRadius:20,
    padding:"6px 13px",cursor:"pointer",fontFamily:"'Caveat',cursive",
    fontSize:14,fontWeight:700,transition:"all .15s",
  };

  return (
    <div style={{width:"100%",height:"100%",background:P.parchment,overflowY:"auto"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`,padding:"18px 20px 20px"}}>
        <button onClick={onBack}
          style={{background:"none",border:"none",color:P.goldLt,fontFamily:"'Caveat',cursive",fontSize:16,cursor:"pointer",marginBottom:10,display:"block"}}>
          ← Kitchen
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:40}}>🔪</span>
          <div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:P.parchmentLt,margin:"0 0 4px"}}>Technique Library</h1>
            <p style={{color:P.brownLt,fontSize:13,margin:0,fontStyle:"italic"}}>{displayTechs.length} technique{displayTechs.length!==1?'s':''} shown</p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{display:"flex",gap:0,borderBottom:`2px solid ${P.parchmentDk}`,background:P.cream,overflowX:"auto"}}>
        {CATS_WITH_ALL.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)}
            style={{
              flex:"0 0 auto",padding:"11px 14px",border:"none",cursor:"pointer",
              background:cat===c.id?P.parchment:"transparent",
              borderBottom:cat===c.id?`3px solid ${P.rust}`:"3px solid transparent",
              fontFamily:"'Caveat',cursive",fontSize:15,fontWeight:700,
              color:cat===c.id?P.rust:P.brownMid,
              transition:"all .15s",whiteSpace:"nowrap",
            }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Sort + Filter controls */}
      <div style={{background:P.cream,borderBottom:`1px solid ${P.parchmentDk}`,padding:"10px 16px 10px"}}>
        {/* Sort row */}
        <div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:8,paddingBottom:2}}>
          <span style={{fontFamily:"'Caveat',cursive",fontSize:13,color:P.brownMid,flexShrink:0,lineHeight:"30px",paddingRight:2}}>Sort:</span>
          {SORT_OPTS.map(o=>{
            const active = sortBy===o.id;
            return (
              <button key={o.id}
                onClick={()=>setSortBy(active?null:o.id)}
                style={{...chipBase,
                  borderColor: active?P.rust:P.parchmentDk,
                  background:  active?P.rust:"transparent",
                  color:       active?"#fff":P.brownMid,
                }}>
                {o.label}
              </button>
            );
          })}
        </div>
        {/* Difficulty filter row */}
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:2}}>
          <span style={{fontFamily:"'Caveat',cursive",fontSize:13,color:P.brownMid,flexShrink:0,lineHeight:"30px",paddingRight:2}}>Level:</span>
          {DIFF_OPTS.map(o=>{
            const active = diffFilter===o.id;
            return (
              <button key={String(o.id)}
                onClick={()=>setDiffFilter(o.id)}
                style={{...chipBase,
                  borderColor: active?P.rust:P.parchmentDk,
                  background:  active?`${P.rust}18`:"transparent",
                  color:       active?P.rust:P.brownMid,
                }}>
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Technique cards */}
      <div style={{padding:"16px 16px 24px"}}>
        {displayTechs.length===0 && (
          <div style={{textAlign:"center",padding:"40px 20px",color:P.brownMid,fontFamily:"'Caveat',cursive",fontSize:18}}>
            No techniques match this filter.
          </div>
        )}
        {displayTechs.map(([id,t])=>{
          const m = getMeta(id);
          const [diffIcon] = DIFF_LABELS[m.d] || ['🟡'];
          return (
            <button key={id} onClick={()=>setSelected(id)}
              style={{
                width:"100%",marginBottom:12,background:P.cream,
                border:`1.5px solid ${P.parchmentDk}`,borderRadius:14,
                padding:"15px 16px",cursor:"pointer",textAlign:"left",
                boxShadow:"0 3px 14px rgba(45,27,14,.08)",display:"block",
                transition:"transform .15s,box-shadow .15s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 22px rgba(45,27,14,.15)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 3px 14px rgba(45,27,14,.08)";}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:13}}>
                <span style={{fontSize:32,flexShrink:0,marginTop:2}}>{t.icon}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:P.brownDk,margin:0}}>{t.name}</h3>
                    <span style={{fontFamily:"'Caveat',cursive",fontSize:12,color:P.brownLt}}>{diffIcon}</span>
                  </div>
                  <p style={{fontFamily:"'Caveat',cursive",fontSize:14,color:P.brownMid,margin:"0 0 9px",fontStyle:"italic"}}>{t.summary}</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {t.cuisines.slice(0,2).map(c=>(
                      <span key={c} style={{background:P.parchmentDk,color:P.brown,padding:"2px 9px",borderRadius:10,fontFamily:"'Caveat',cursive",fontSize:11,fontWeight:600}}>{c.split("(")[0].trim()}</span>
                    ))}
                    {t.cuisines.length>2&&<span style={{color:P.brownLt,fontFamily:"'Caveat',cursive",fontSize:11,padding:"2px 4px"}}>+{t.cuisines.length-2}</span>}
                    <span style={{background:`${P.parchmentDk}`,color:P.brownLt,padding:"2px 9px",borderRadius:10,fontFamily:"'Caveat',cursive",fontSize:11,marginLeft:"auto"}}>⏱ {fmtTime(m.t)}</span>
                  </div>
                </div>
                <span style={{color:P.brownLt,fontSize:18,flexShrink:0,marginTop:4}}>›</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
