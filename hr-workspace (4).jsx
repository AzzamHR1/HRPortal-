import { useState, useRef } from "react";
const uid=()=>Math.random().toString(36).slice(2,9);
const td=new Date().toISOString().split("T")[0];
const M=[{id:"m1",n:"Sarah Ahmed",a:"SA",c:"#7C3AED"},{id:"m2",n:"Omar Hassan",a:"OH",c:"#2563EB"},{id:"m3",n:"Layla Khalil",a:"LK",c:"#DB2777"},{id:"m4",n:"Yusuf Ali",a:"YA",c:"#059669"}];
const PR=[{id:"low",l:"منخفض",c:"#6B7280"},{id:"medium",l:"متوسط",c:"#2563EB"},{id:"high",l:"عالي",c:"#F59E0B"},{id:"urgent",l:"عاجل",c:"#EF4444"}];
const IST=[{id:"todo",l:"انتظار",c:"#6B7280"},{id:"progress",l:"تنفيذ",c:"#2563EB"},{id:"review",l:"مراجعة",c:"#F59E0B"},{id:"done",l:"مكتمل",c:"#10B981"}];
const ITK=[
  {id:uid(),t:"مراجعة سياسة العمل عن بعد",s:"progress",p:"high",as:"m1",tg:["سياسات"],d:"2026-03-25",cm:[{id:uid(),au:"m2",tx:"تم إعداد المسودة",tm:"منذ ساعتين"}],at:[{id:uid(),n:"سياسة.pdf",sz:"2.4MB"}],dn:false},
  {id:uid(),t:"إعداد تقرير Q1",s:"todo",p:"urgent",as:"m2",tg:["تقارير"],d:"2026-03-30",cm:[],at:[],dn:false},
  {id:uid(),t:"تحديث دليل الموظف",s:"review",p:"medium",as:"m3",tg:["سياسات"],d:"2026-04-01",cm:[],at:[],dn:false},
  {id:uid(),t:"جدولة مقابلات التوظيف",s:"done",p:"low",as:"m4",tg:["توظيف"],d:"2026-03-20",cm:[],at:[],dn:true,dAt:"2026-03-19"},
  {id:uid(),t:"خطة التدريب السنوية",s:"todo",p:"high",as:"m1",tg:["تدريب"],d:"2026-04-15",cm:[],at:[],dn:false},
  {id:uid(),t:"مراجعة عقود الموظفين",s:"progress",p:"medium",as:"m3",tg:["عقود"],d:"2026-03-28",cm:[],at:[{id:uid(),n:"عقد.docx",sz:"890KB"}],dn:false},
];

const v={bg:"#F0F4F8",bg2:"#FFF",bg3:"#E8EEF4",bgi:"#F0F4F8",fg:"#0F172A",fg2:"#475569",fg3:"#94A3B8",bd:"#CBD5E1",ac:"#1E3A5F",acl:"#DBEAFE",ok:"#059669",okl:"#D1FAE5",wn:"#D97706",wnl:"#FEF3C7",er:"#DC2626",erl:"#FEE2E2"};
const d={bg:"#0B1120",bg2:"#131B2E",bg3:"#1A2540",bgi:"#162035",fg:"#F1F5F9",fg2:"#94A3B8",fg3:"#475569",bd:"#1E3050",ac:"#3B82F6",acl:"#0F2440",ok:"#34D399",okl:"#064E3B",wn:"#FBBF24",wnl:"#713F12",er:"#F87171",erl:"#7F1D1D"};

const Av=({m,b})=>{const x=M.find(z=>z.id===(m?.id||m));return <div style={{width:b?34:22,height:b?34:22,borderRadius:b?10:7,background:x?.c||"#888",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:b?11:8,flexShrink:0}}>{x?.a||"?"}</div>};
const Bg=({l,c})=><span style={{padding:"1px 6px",borderRadius:5,fontSize:8,fontWeight:600,background:(c||"#888")+"18",color:c}}>{l}</span>;
const Ck=({ck,ch})=><button onClick={e=>{e.stopPropagation();ch()}} style={{width:18,height:18,borderRadius:5,border:ck?"none":"2px solid "+v.bd,background:ck?v.ok:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,padding:0}}>{ck&&<span style={{color:"#fff",fontSize:10}}>✓</span>}</button>;
const Dn=({val,tot,c,sz})=>{const p=tot>0?(val/tot)*100:0,r=((sz||60)-8)/2,ci=2*Math.PI*r;return <svg width={sz||60} height={sz||60} style={{transform:"rotate(-90deg)"}}><circle cx={(sz||60)/2} cy={(sz||60)/2} r={r} fill="none" stroke="currentColor" strokeWidth="5" opacity=".15"/><circle cx={(sz||60)/2} cy={(sz||60)/2} r={r} fill="none" stroke={c} strokeWidth="5" strokeDasharray={ci} strokeDashoffset={ci-(ci*p/100)} strokeLinecap="round"/><text x={(sz||60)/2} y={(sz||60)/2} textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="11" fontWeight="700" style={{transform:"rotate(90deg)",transformOrigin:"center"}}>{Math.round(p)}%</text></svg>};

export default function App(){
  const[dk,setDk]=useState(false);const[lg,setLg]=useState(false);const[pg,setPg]=useState("dash");const[sb,setSb]=useState(true);
  const[tk,setTk]=useState(ITK);const[st,setSt]=useState(IST);
  const[sN,setSN]=useState(false);const[nf]=useState([{id:"1",tx:"مهمة عاجلة: تقرير Q1",rd:false},{id:"2",tx:"تعليق جديد",rd:false}]);
  const[br,setBr]=useState("#1E3A5F");
  const c=dk?d:v;
  const NV=[{id:"dash",l:"لوحة التحكم",e:"🏠"},{id:"tasks",l:"المهام",e:"✅"},{id:"tpl",l:"الخطابات",e:"📄"},{id:"ana",l:"التقارير",e:"📊"},{id:"set",l:"الإعدادات",e:"⚙️"}];

  const sty={fontFamily:"system-ui,sans-serif",background:c.bg,color:c.fg,minHeight:"100vh"};

  // Login
  if(!lg)return <div style={{...sty,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{width:"100%",maxWidth:360,background:c.bg2,border:"1px solid "+c.bd,borderRadius:20,padding:28}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#1E3A5F,#2563EB)",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:8}}><svg viewBox="0 0 40 40" width="26" height="26" fill="none"><circle cx="20" cy="20" r="8" stroke="#fff" strokeWidth="2.5"/><path d="M12 20h-6M28 20h6M20 12v-6M20 28v6" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20" cy="20" r="3" fill="#60A5FA"/></svg></div>
        <div style={{fontSize:16,fontWeight:800,letterSpacing:3,color:c.fg}}>APC</div>
        <div style={{fontSize:9,color:c.fg3}}>HR PORTAL — الشركة العربية للأنابيب</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <input defaultValue="sarah@apc.com" style={{padding:"9px 12px",borderRadius:10,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:12,outline:"none"}}/>
        <input type="password" defaultValue="12345678" style={{padding:"9px 12px",borderRadius:10,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:12,outline:"none"}}/>
        <button onClick={()=>setLg(true)} style={{padding:11,borderRadius:10,border:"none",background:"linear-gradient(135deg,"+c.ac+",#2563EB)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>تسجيل الدخول</button>
      </div>
      <p style={{textAlign:"center",fontSize:9,color:c.fg3,marginTop:16}}>🔒 وصول مقيد — فريق HR فقط</p>
    </div>
  </div>;

  // Dashboard
  const DashP=()=>{const dn=tk.filter(t=>t.dn).length,ov=tk.filter(t=>new Date(t.d)<new Date()&&!t.dn).length,pc=tk.length?Math.round((dn/tk.length)*100):0;
    return <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><h1 style={{fontSize:20,fontWeight:800,margin:0}}>مرحبًا، Sarah 👋</h1><p style={{fontSize:11,color:c.fg3,marginTop:4}}>{tk.filter(t=>!t.dn).length} نشطة{ov>0&&<span style={{color:c.er}}>{" · "+ov+" متأخرة"}</span>}</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8}}>
        {[{l:"إجمالي",v:tk.length,co:c.ac,e:"📋"},{l:"مكتملة",v:dn,co:c.ok,e:"✅"},{l:"متأخرة",v:ov,co:c.er,e:"⏰"}].map((s,i)=><div key={i} style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:16}}>{s.e}</span><span style={{fontSize:18,fontWeight:800,color:s.co}}>{s.v}</span></div><span style={{fontSize:9,color:c.fg3}}>{s.l}</span></div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
        <div style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:14}}><h3 style={{fontSize:11,fontWeight:700,marginBottom:10}}>📊 الحالة</h3><div style={{display:"flex",justifyContent:"center",marginBottom:8}}><Dn val={dn} tot={tk.length} c={c.ok} sz={80}/></div>{st.map(s=><div key={s.id} style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:7,borderRadius:2,background:s.c}}/><span style={{color:c.fg2}}>{s.l}</span></div><b>{tk.filter(t=>t.s===s.id).length}</b></div>)}</div>
        <div style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:14}}><h3 style={{fontSize:11,fontWeight:700,marginBottom:10}}>📌 القادمة</h3>{tk.filter(t=>!t.dn).slice(0,4).map(t=>{const mb=M.find(x=>x.id===t.as),p=PR.find(x=>x.id===t.p);return <div key={t.id} onClick={()=>setPg("tasks")} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 6px",borderRadius:8,cursor:"pointer",borderRight:"3px solid "+(p?.c),marginBottom:4}}><div style={{flex:1}}><p style={{fontSize:10,fontWeight:600,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.t}</p><span style={{fontSize:8,color:c.fg3}}>{t.d}</span></div><Av m={mb}/></div>})}</div>
      </div>
    </div>};

  // Tasks
  const TaskP=()=>{const[vw,setVw]=useState("kanban");const[sA,setSA]=useState(false);const[eT,setET]=useState(null);const[sr,setSr]=useState("");const[cm,setCm]=useState("");const[dI,setDI]=useState(null);const[sD,setSD]=useState(false);
    const ac=tk.filter(t=>!t.dn),cp=tk.filter(t=>t.dn),fl=ac.filter(t=>t.t.includes(sr));
    const doC=id=>setTk(tk.map(t=>t.id===id?{...t,dn:true,dAt:td,s:"done"}:t));
    const doU=id=>setTk(tk.map(t=>t.id===id?{...t,dn:false,dAt:null,s:"todo"}:t));
    const TF=({ini,onS,onC})=>{const[f,sF]=useState(ini||{t:"",s:"todo",p:"medium",as:"m1",tg:[],d:td,at:[]});const ff=useRef(null);
      return <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <input value={f.t} onChange={e=>sF({...f,t:e.target.value})} placeholder="عنوان المهمة *" style={{padding:"8px 10px",borderRadius:8,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:12,outline:"none"}}/>
        <div style={{display:"flex",gap:6}}><select value={f.s} onChange={e=>sF({...f,s:e.target.value})} style={{flex:1,padding:"7px 8px",borderRadius:8,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:11,outline:"none"}}>{st.map(s=><option key={s.id} value={s.id}>{s.l}</option>)}</select><select value={f.p} onChange={e=>sF({...f,p:e.target.value})} style={{flex:1,padding:"7px 8px",borderRadius:8,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:11,outline:"none"}}>{PR.map(p=><option key={p.id} value={p.id}>{p.l}</option>)}</select></div>
        <div style={{display:"flex",gap:6}}><select value={f.as} onChange={e=>sF({...f,as:e.target.value})} style={{flex:1,padding:"7px 8px",borderRadius:8,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:11,outline:"none"}}>{M.map(m=><option key={m.id} value={m.id}>{m.n}</option>)}</select><input type="date" value={f.d} onChange={e=>sF({...f,d:e.target.value})} style={{flex:1,padding:"7px 8px",borderRadius:8,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:11,outline:"none"}}/></div>
        <div><input ref={ff} type="file" multiple style={{display:"none"}} onChange={e=>{sF({...f,at:[...(f.at||[]),...Array.from(e.target.files).map(x=>({id:uid(),n:x.name,sz:(x.size/1024).toFixed(0)+"KB"}))]});e.target.value=""}}/>{f.at?.length>0&&f.at.map(a=><div key={a.id} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 6px",borderRadius:6,background:c.bg3,marginBottom:3,fontSize:9}}><span>📎 {a.n}</span><button onClick={()=>sF({...f,at:f.at.filter(x=>x.id!==a.id)})} style={{background:"none",border:"none",color:c.er,cursor:"pointer",fontSize:9,marginInlineStart:"auto"}}>✕</button></div>)}<button onClick={()=>ff.current?.click()} style={{width:"100%",padding:6,borderRadius:6,border:"1.5px dashed "+c.bd,background:"transparent",color:c.ac,fontSize:10,cursor:"pointer"}}>📎 إضافة مرفق</button></div>
        <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}><button onClick={onC} style={{padding:"6px 14px",borderRadius:8,border:"1px solid "+c.bd,background:c.bg2,color:c.fg2,fontSize:11,cursor:"pointer"}}>إلغاء</button><button onClick={()=>f.t&&onS(f)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:c.ac,color:"#fff",fontSize:11,cursor:"pointer",fontWeight:600}}>حفظ</button></div>
      </div>};
    // Modal
    const Md=({op,cl,ti,ch})=>{if(!op)return null;return <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={cl}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)"}}/><div style={{position:"relative",background:c.bg2,border:"1px solid "+c.bd,borderRadius:16,padding:20,width:"100%",maxWidth:480,maxHeight:"80vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><h3 style={{fontSize:14,fontWeight:700}}>{ti}</h3><button onClick={cl} style={{background:c.bg3,border:"none",cursor:"pointer",padding:"4px 8px",borderRadius:6}}>✕</button></div>{ch}</div></div>};
    return <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><h1 style={{fontSize:20,fontWeight:800,margin:0}}>إدارة المهام</h1><button onClick={()=>setSA(true)} style={{padding:"7px 14px",borderRadius:8,border:"none",background:c.ac,color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>➕ مهمة جديدة</button></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:6}}>{[{l:"نشطة",v:ac.length,co:c.ac,bg:c.acl},{l:"مكتملة",v:cp.length,co:c.ok,bg:c.okl},{l:"متأخرة",v:ac.filter(t=>new Date(t.d)<new Date()).length,co:c.er,bg:c.erl},{l:"عاجلة",v:ac.filter(t=>t.p==="urgent").length,co:c.wn,bg:c.wnl}].map((x,i)=><div key={i} style={{padding:"8px 12px",borderRadius:10,background:x.bg,display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:16,fontWeight:800,color:x.co}}>{x.v}</span><span style={{fontSize:9,color:c.fg3}}>{x.l}</span></div>)}</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"}}><input value={sr} onChange={e=>setSr(e.target.value)} placeholder="🔍 بحث..." style={{padding:"6px 10px",borderRadius:8,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:11,outline:"none",width:150}}/><div style={{display:"flex",gap:4}}>{cp.length>0&&<button onClick={()=>setSD(!sD)} style={{padding:"5px 12px",borderRadius:12,border:"none",background:sD?c.ok:c.okl,color:sD?"#fff":c.ok,fontSize:10,fontWeight:600,cursor:"pointer"}}>🏆 المنجزة ({cp.length})</button>}{["kanban","list"].map(k=><button key={k} onClick={()=>setVw(k)} style={{padding:"5px 8px",borderRadius:6,border:"1px solid "+c.bd,background:vw===k?c.ac:c.bgi,color:vw===k?"#fff":c.fg3,fontSize:10,cursor:"pointer"}}>{k==="kanban"?"▦":"☰"}</button>)}</div></div>
      {sD&&<div style={{borderRadius:12,border:"2px solid "+c.ok,background:c.okl,padding:12}}><h3 style={{fontSize:13,fontWeight:700,color:c.ok,marginBottom:8}}>🏆 المنجزة</h3>{cp.map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:6,padding:8,borderRadius:8,background:c.bg2,marginBottom:4}}><Ck ck ch={()=>doU(t.id)}/><p style={{flex:1,fontSize:11,color:c.fg3,margin:0,textDecoration:"line-through"}}>{t.t}</p><span style={{fontSize:8,color:c.fg3}}>✅{t.dAt}</span><button onClick={()=>doU(t.id)} style={{padding:"2px 8px",borderRadius:5,border:"1px solid "+c.bd,background:"transparent",color:c.ac,fontSize:8,cursor:"pointer"}}>↩</button></div>)}</div>}
      {vw==="kanban"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>{st.map(s=><div key={s.id} style={{background:c.bg3,borderRadius:12,padding:8,minHeight:140}} onDragOver={e=>e.preventDefault()} onDrop={()=>{if(dI){setTk(tk.map(t=>t.id===dI?{...t,s:s.id}:t));setDI(null)}}}>
        <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:8}}><div style={{width:7,height:7,borderRadius:2,background:s.c}}/><span style={{fontSize:10,fontWeight:700}}>{s.l}</span><span style={{marginInlineStart:"auto",fontSize:8,padding:"1px 5px",borderRadius:4,background:c.bg2,color:c.fg3}}>{fl.filter(t=>t.s===s.id).length}</span></div>
        {fl.filter(t=>t.s===s.id).map(t=>{const mb=M.find(x=>x.id===t.as),p=PR.find(x=>x.id===t.p);return <div key={t.id} draggable onDragStart={()=>setDI(t.id)} style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:10,padding:10,marginBottom:6,cursor:"pointer"}}>
          <div style={{display:"flex",gap:5,marginBottom:5}}><Ck ck={false} ch={()=>doC(t.id)}/><div style={{flex:1}} onClick={()=>setET(t)}><div style={{display:"flex",gap:2,marginBottom:2}}>{t.tg?.map(tag=><Bg key={tag} l={tag} c={c.ac}/>)}</div><p style={{fontSize:11,fontWeight:600,margin:0}}>{t.t}</p></div></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:3}}><Av m={mb}/><Bg l={p?.l} c={p?.c}/></div><span style={{fontSize:8,color:new Date(t.d)<new Date()?c.er:c.fg3}}>{t.d?.slice(5)}{t.at?.length>0&&" 📎"+t.at.length}{t.cm?.length>0&&" 💬"+t.cm.length}</span></div>
        </div>})}
      </div>)}</div>}
      {vw==="list"&&<div style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:10,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}><thead><tr style={{borderBottom:"2px solid "+c.bd}}>{["","المهمة","الحالة","الأولوية","المسؤول","التاريخ"].map((h,i)=><th key={i} style={{textAlign:"right",padding:"7px 8px",color:c.fg3,fontSize:9}}>{h}</th>)}</tr></thead><tbody>{fl.map(t=>{const mb=M.find(x=>x.id===t.as),sta=st.find(x=>x.id===t.s),p=PR.find(x=>x.id===t.p);return <tr key={t.id} style={{borderBottom:"1px solid "+c.bd}} onClick={()=>setET(t)}><td style={{padding:"7px 8px"}}><Ck ck={false} ch={()=>doC(t.id)}/></td><td style={{padding:"7px 8px",fontWeight:600}}>{t.t}</td><td><Bg l={sta?.l} c={sta?.c}/></td><td><Bg l={p?.l} c={p?.c}/></td><td><div style={{display:"flex",alignItems:"center",gap:3}}><Av m={mb}/><span style={{fontSize:9,color:c.fg2}}>{mb?.n}</span></div></td><td style={{color:c.fg3}}>{t.d}</td></tr>})}</tbody></table></div>}
      <Md op={sA} cl={()=>setSA(false)} ti="مهمة جديدة" ch={<TF onS={t=>{setTk([...tk,{...t,id:uid(),cm:[],dn:false}]);setSA(false)}} onC={()=>setSA(false)}/>}/>
      <Md op={!!eT} cl={()=>setET(null)} ti="تفاصيل المهمة" ch={eT&&<><TF ini={eT} onS={t=>{setTk(tk.map(x=>x.id===t.id?{...x,...t}:x));setET(null)}} onC={()=>setET(null)}/>
        <div style={{borderTop:"1px solid "+c.bd,marginTop:12,paddingTop:10}}><h4 style={{fontSize:11,fontWeight:700,marginBottom:6}}>💬 التعليقات ({eT.cm?.length||0})</h4>{eT.cm?.map(x=>{const mb=M.find(z=>z.id===x.au);return <div key={x.id} style={{display:"flex",gap:4,marginBottom:4}}><Av m={mb}/><div style={{flex:1,background:c.bg3,borderRadius:8,padding:6}}><b style={{fontSize:9}}>{mb?.n}</b><p style={{fontSize:9,color:c.fg2,margin:"2px 0 0"}}>{x.tx}</p></div></div>})}<div style={{display:"flex",gap:4}}><input value={cm} onChange={e=>setCm(e.target.value)} placeholder="تعليق..." style={{flex:1,padding:"6px 8px",borderRadius:6,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:10,outline:"none"}} onKeyDown={e=>{if(e.key==="Enter"&&cm.trim()){const up={...eT,cm:[...(eT.cm||[]),{id:uid(),au:"m1",tx:cm,tm:"الآن"}]};setTk(tk.map(x=>x.id===up.id?up:x));setET(up);setCm("")}}}/><button onClick={()=>{if(cm.trim()){const up={...eT,cm:[...(eT.cm||[]),{id:uid(),au:"m1",tx:cm,tm:"الآن"}]};setTk(tk.map(x=>x.id===up.id?up:x));setET(up);setCm("")}}} style={{padding:"5px 10px",borderRadius:6,border:"none",background:c.ac,color:"#fff",fontSize:10,cursor:"pointer"}}>↗</button></div></div>
        <div style={{borderTop:"1px solid "+c.bd,marginTop:10,paddingTop:8,textAlign:"center"}}>{!eT.dn?<button onClick={()=>{doC(eT.id);setET(null)}} style={{padding:"7px 18px",borderRadius:8,border:"none",background:c.ok,color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>✅ تم إنجاز المهمة</button>:<button onClick={()=>{doU(eT.id);setET(null)}} style={{padding:"7px 18px",borderRadius:8,border:"1px solid "+c.bd,background:c.bg2,color:c.ac,fontSize:11,cursor:"pointer"}}>↩ إعادة فتح</button>}</div>
      </>}/>
    </div>};

  // Templates
  const TplP=()=>{const[tab,setTab]=useState("salary");const[emp,setEmp]=useState({nm:"",ne:"",eid:"",ti:"",te:"",dp:"",de:"",jd:"",nat:"",idn:"",ed:"",dur:"",rsn:"",ld:"",bs:"",hs:"",tr:"",ot:"",tt:""});const[gen,setGen]=useState(null);
    const tabs=[{id:"salary",l:"تعريف راتب",e:"💰",en:"Salary Certificate"},{id:"clearance",l:"إخلاء طرف",e:"📋",en:"Clearance Form"},{id:"service",l:"شهادة خدمة",e:"📜",en:"Service Certificate"}];
    const F=({l,f,tp,h})=><div style={{flex:h?"1 1 45%":"1 1 100%",minWidth:h?140:0}}><label style={{fontSize:9,fontWeight:600,color:c.fg2,display:"block",marginBottom:3}}>{l}</label><input value={emp[f]} onChange={e=>setEmp({...emp,[f]:e.target.value})} type={tp||"text"} placeholder={l} style={{width:"100%",padding:"6px 8px",borderRadius:7,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:11,outline:"none"}}/></div>;
    const ct=tabs.find(t=>t.id===tab);
    return <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div><h1 style={{fontSize:20,fontWeight:800,margin:0}}>الخطابات والنماذج</h1><p style={{fontSize:10,color:c.fg3,marginTop:3}}>أدخل البيانات واحصل على خطاب جاهز</p></div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{tabs.map(t=><button key={t.id} onClick={()=>{setTab(t.id);setGen(null)}} style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:10,border:tab===t.id?"2px solid "+c.ac:"1px solid "+c.bd,background:tab===t.id?c.acl:c.bg2,cursor:"pointer"}}><span style={{fontSize:16}}>{t.e}</span><div><p style={{fontSize:11,fontWeight:700,color:tab===t.id?c.ac:c.fg,margin:0}}>{t.l}</p><p style={{fontSize:8,color:c.fg3,margin:0}}>{t.en}</p></div></button>)}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"start"}}>
        <div style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:14}}>
          <h3 style={{fontSize:12,fontWeight:700,marginBottom:12}}>{ct?.e+" "+ct?.l}</h3>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            <F l="الاسم (عربي)" f="nm" h/><F l="Name (EN)" f="ne" h/><F l="الرقم الوظيفي" f="eid" h/><F l="رقم الهوية" f="idn" h/><F l="المسمى" f="ti" h/><F l="Job Title" f="te" h/><F l="القسم" f="dp" h/><F l="Department" f="de" h/><F l="تاريخ الالتحاق" f="jd" tp="date" h/><F l="الجنسية" f="nat" h/>
            {tab==="salary"&&<><div style={{width:"100%",height:1,background:c.bd}}/><F l="الأساسي (SAR)" f="bs" h/><F l="السكن" f="hs" h/><F l="النقل" f="tr" h/><F l="أخرى" f="ot" h/><F l="الإجمالي" f="tt" h/></>}
            {tab==="clearance"&&<><div style={{width:"100%",height:1,background:c.bd}}/><F l="آخر يوم" f="ld" tp="date" h/><F l="السبب" f="rsn" h/></>}
            {tab==="service"&&<><div style={{width:"100%",height:1,background:c.bd}}/><F l="تاريخ الانتهاء" f="ed" tp="date" h/><F l="المدة" f="dur" h/></>}
          </div>
          <div style={{marginTop:12,display:"flex",gap:6}}><button onClick={()=>setGen(tab)} style={{flex:1,padding:8,borderRadius:8,border:"none",background:c.ac,color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>📄 معاينة</button><button onClick={()=>setEmp({nm:"",ne:"",eid:"",ti:"",te:"",dp:"",de:"",jd:"",nat:"",idn:"",ed:"",dur:"",rsn:"",ld:"",bs:"",hs:"",tr:"",ot:"",tt:""})} style={{padding:"8px 14px",borderRadius:8,border:"1px solid "+c.bd,background:c.bg2,color:c.fg2,fontSize:11,cursor:"pointer"}}>مسح</button></div>
        </div>
        <div style={{background:c.bg3,borderRadius:12,overflow:"hidden"}}>
          {!gen?<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:340,gap:8,padding:20}}><span style={{fontSize:36}}>📄</span><p style={{fontSize:12,fontWeight:600}}>معاينة الخطاب</p><p style={{fontSize:10,color:c.fg3,textAlign:"center"}}>أدخل البيانات واضغط "معاينة"</p></div>
          :<div style={{background:"#fff",margin:12,borderRadius:8,padding:20,color:"#111",fontSize:10,lineHeight:1.7,fontFamily:"Arial"}}>
            <div style={{textAlign:"center",borderBottom:"3px solid #1E3A5F",paddingBottom:10,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:8,background:"linear-gradient(135deg,#1E3A5F,#3B82F6)",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:4}}><svg viewBox="0 0 40 40" width="22" height="22" fill="none"><circle cx="20" cy="20" r="8" stroke="#fff" strokeWidth="2.5"/><path d="M12 20h-6M28 20h6M20 12v-6M20 28v6" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20" cy="20" r="3" fill="#60A5FA"/></svg></div>
              <p style={{fontSize:12,fontWeight:800,color:"#1E3A5F",margin:"0 0 1px",letterSpacing:1}}>ARABIAN PIPES COMPANY</p>
              <p style={{fontSize:10,fontWeight:700,color:"#1E3A5F",margin:"0 0 2px"}}>الشركة العربية للأنابيب</p>
              <p style={{fontSize:7,color:"#888",margin:0}}>P.O. Box 42734, Riyadh 11551</p>
            </div>
            <div style={{textAlign:"center",marginBottom:12}}><p style={{fontSize:14,fontWeight:800,color:"#1E3A5F",margin:"0 0 1px"}}>{gen==="salary"?"تعريف بالراتب":gen==="clearance"?"إخلاء طرف":"شهادة خدمة"}</p><p style={{fontSize:10,color:"#3B82F6",fontWeight:600,margin:0}}>{gen==="salary"?"SALARY CERTIFICATE":gen==="clearance"?"CLEARANCE FORM":"SERVICE CERTIFICATE"}</p></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#555",marginBottom:10}}><span><b style={{color:"#1E3A5F"}}>Ref:</b> APC/HR/{td.replace(/-/g,"")}</span><span><b style={{color:"#1E3A5F"}}>Date:</b> {td}</span></div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:9,marginBottom:12}}><tbody>{[["الاسم",emp.ne?(emp.nm+" / "+emp.ne):emp.nm||"—"],["الرقم الوظيفي",emp.eid||"—"],["المسمى",emp.te?(emp.ti+" / "+emp.te):emp.ti||"—"],["القسم",emp.de?(emp.dp+" / "+emp.de):emp.dp||"—"],["الالتحاق",emp.jd||"—"],["الجنسية",emp.nat||"—"],["الهوية",emp.idn||"—"],...(gen==="clearance"?[["آخر يوم",emp.ld||"—"],["السبب",emp.rsn||"—"]]:[]),...(gen==="service"?[["الانتهاء",emp.ed||"—"],["المدة",emp.dur||"—"]]:[])].map(([l,vl],i)=><tr key={i}><td style={{padding:"3px 5px",border:"1px solid #D0D8E8",background:"#EDF2F7",fontWeight:600,color:"#1E3A5F",width:"35%"}}>{l}</td><td style={{padding:"3px 5px",border:"1px solid #D0D8E8"}}>{vl}</td></tr>)}</tbody></table>
            {gen==="salary"&&<table style={{width:"100%",borderCollapse:"collapse",fontSize:9,marginBottom:12}}><thead><tr><td style={{padding:"3px 5px",border:"1px solid #D0D8E8",background:"#1E3A5F",color:"#fff",fontWeight:700,textAlign:"center"}}>البند</td><td style={{padding:"3px 5px",border:"1px solid #D0D8E8",background:"#1E3A5F",color:"#fff",fontWeight:700,textAlign:"center"}}>المبلغ</td></tr></thead><tbody>{[["الأساسي",emp.bs],["السكن",emp.hs],["النقل",emp.tr],["أخرى",emp.ot],["الإجمالي",emp.tt]].map(([l,vl],i)=><tr key={i}><td style={{padding:"3px 5px",border:"1px solid #D0D8E8",fontWeight:i===4?700:400,background:i===4?"#EDF2F7":""}}>{l}</td><td style={{padding:"3px 5px",border:"1px solid #D0D8E8",textAlign:"center",fontWeight:i===4?700:400,background:i===4?"#EDF2F7":""}}>{vl||"—"}</td></tr>)}</tbody></table>}
            {gen==="clearance"&&<table style={{width:"100%",borderCollapse:"collapse",fontSize:8,marginBottom:12}}><thead><tr>{["القسم","✓","توقيع","تاريخ"].map((h,i)=><td key={i} style={{padding:"2px 4px",border:"1px solid #D0D8E8",background:"#1E3A5F",color:"#fff",fontWeight:700,textAlign:"center"}}>{h}</td>)}</tr></thead><tbody>{["الموارد البشرية","المالية","تقنية المعلومات","الإدارية","المستودعات","القسم المباشر","الأمن"].map((dd,i)=><tr key={i}><td style={{padding:"2px 4px",border:"1px solid #D0D8E8",background:i%2===0?"#F8FAFC":""}}>{dd}</td><td style={{padding:"2px 4px",border:"1px solid #D0D8E8",textAlign:"center"}}>☐</td><td style={{padding:"2px 4px",border:"1px solid #D0D8E8"}}></td><td style={{padding:"2px 4px",border:"1px solid #D0D8E8"}}></td></tr>)}</tbody></table>}
            <p style={{fontSize:8,color:"#555",fontStyle:"italic"}}>Issued upon request without liability.</p>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:16}}><div><p style={{fontSize:9,fontWeight:700,color:"#1E3A5F",margin:"0 0 20px"}}>HR Manager</p><p style={{fontSize:8,color:"#888"}}>Sign: ________</p></div><div><p style={{fontSize:9,fontWeight:700,color:"#1E3A5F",margin:"0 0 20px"}}>General Manager</p><p style={{fontSize:8,color:"#888"}}>Sign: ________</p></div></div>
          </div>}
        </div>
      </div>
    </div>};

  // Analytics
  const AnaP=()=>{const dn=tk.filter(t=>t.dn).length,pc=tk.length?Math.round((dn/tk.length)*100):0;
    return <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <h1 style={{fontSize:20,fontWeight:800,margin:0}}>التقارير</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>{[{l:"الإنجاز",v:pc+"%",co:c.ok},{l:"متوسط",v:"3.2 يوم",co:c.ac},{l:"متأخرة",v:tk.filter(t=>new Date(t.d)<new Date()&&!t.dn).length,co:c.er}].map((x,i)=><div key={i} style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:12}}><p style={{fontSize:9,color:c.fg3,margin:"0 0 2px"}}>{x.l}</p><p style={{fontSize:22,fontWeight:800,color:x.co,margin:0}}>{x.v}</p></div>)}</div>
      <div style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:14}}><h3 style={{fontSize:11,fontWeight:700,marginBottom:10}}>👥 الفريق</h3>{M.map(m=>{const tt=tk.filter(t=>t.as===m.id).length,dd=tk.filter(t=>t.as===m.id&&t.dn).length;return <div key={m.id} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><div style={{display:"flex",alignItems:"center",gap:4}}><Av m={m}/><span style={{fontSize:10}}>{m.n}</span></div><span style={{fontSize:8,color:c.fg3}}>{dd}/{tt}</span></div><div style={{height:5,borderRadius:3,background:c.bg3}}><div style={{height:"100%",borderRadius:3,width:(tt?(dd/tt)*100:0)+"%",background:m.c}}/></div></div>})}</div>
    </div>};

  // Settings
  const SetP=()=>{const[ns,setNs]=useState({l:"",c:"#6B7280"});
    return <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <h1 style={{fontSize:20,fontWeight:800,margin:0}}>الإعدادات</h1>
      <div style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:14}}><h3 style={{fontSize:11,fontWeight:700,marginBottom:10}}>🎨 لون الهوية</h3><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{"#1E3A5F,#0F4C81,#2563EB,#3B82F6,#0891B2,#059669,#1E40AF".split(",").map(cc=><button key={cc} onClick={()=>setBr(cc)} style={{width:28,height:28,borderRadius:8,background:cc,border:br===cc?"3px solid "+c.fg:"2px solid transparent",cursor:"pointer"}}/>)}<input type="color" value={br} onChange={e=>setBr(e.target.value)} style={{width:28,height:28,borderRadius:8,cursor:"pointer",border:"none"}}/></div></div>
      <div style={{background:c.bg2,border:"1px solid "+c.bd,borderRadius:12,padding:14}}><h3 style={{fontSize:11,fontWeight:700,marginBottom:10}}>📌 حالات المهام</h3>{st.map(s=><div key={s.id} style={{display:"flex",alignItems:"center",gap:5,padding:6,borderRadius:6,background:c.bg3,marginBottom:3}}><div style={{width:10,height:10,borderRadius:3,background:s.c}}/><span style={{flex:1,fontSize:10}}>{s.l}</span><input type="color" value={s.c} onChange={e=>setSt(st.map(x=>x.id===s.id?{...x,c:e.target.value}:x))} style={{width:18,height:18,borderRadius:4,cursor:"pointer",border:"none"}}/></div>)}<div style={{display:"flex",gap:4,marginTop:6}}><input value={ns.l} onChange={e=>setNs({...ns,l:e.target.value})} placeholder="حالة جديدة..." style={{flex:1,padding:"5px 8px",borderRadius:6,border:"1px solid "+c.bd,background:c.bgi,color:c.fg,fontSize:10,outline:"none"}}/><input type="color" value={ns.c} onChange={e=>setNs({...ns,c:e.target.value})} style={{width:28,height:28,borderRadius:6,cursor:"pointer",border:"none"}}/><button onClick={()=>{if(ns.l){setSt([...st,{id:uid(),l:ns.l,c:ns.c}]);setNs({l:"",c:"#6B7280"})}}} style={{padding:"5px 12px",borderRadius:6,border:"none",background:c.ac,color:"#fff",fontSize:10,cursor:"pointer"}}>إضافة</button></div></div>
    </div>};

  return <div style={sty} dir="rtl">
    <div style={{display:"flex",minHeight:"100vh"}}>
      <aside style={{width:sb?180:50,flexShrink:0,borderLeft:"1px solid "+c.bd,background:c.bg2,height:"100vh",position:"sticky",top:0,display:"flex",flexDirection:"column",transition:"width .25s",overflow:"hidden"}}>
        <div style={{padding:sb?12:8,display:"flex",justifyContent:sb?"flex-start":"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:sb?32:28,height:sb?32:28,borderRadius:8,background:"linear-gradient(135deg,#1E3A5F,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 40 40" width={sb?18:14} height={sb?18:14} fill="none"><circle cx="20" cy="20" r="8" stroke="#fff" strokeWidth="2.5"/><path d="M12 20h-6M28 20h6M20 12v-6M20 28v6" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20" cy="20" r="3" fill="#60A5FA"/></svg></div>
            {sb&&<div><div style={{fontSize:13,fontWeight:800,letterSpacing:2,fontFamily:"monospace"}}>APC</div><div style={{fontSize:7,color:c.fg3}}>HR PORTAL</div></div>}
          </div>
        </div>
        <nav style={{flex:1,padding:"4px 6px"}}>{NV.map(n=><button key={n.id} onClick={()=>setPg(n.id)} style={{display:"flex",alignItems:"center",gap:7,padding:sb?"8px 10px":"8px 0",justifyContent:sb?"flex-start":"center",borderRadius:8,fontSize:11,fontWeight:pg===n.id?700:400,background:pg===n.id?c.acl:"transparent",color:pg===n.id?c.ac:c.fg2,border:"none",cursor:"pointer",width:"100%",marginBottom:2}}><span style={{fontSize:14}}>{n.e}</span>{sb&&<span>{n.l}</span>}</button>)}</nav>
        {sb&&<div style={{padding:8,borderTop:"1px solid "+c.bd}}><div style={{display:"flex",alignItems:"center",gap:6,padding:6,borderRadius:8,background:c.bg3}}><Av m="m1" b/><div><p style={{fontSize:10,fontWeight:700,margin:0}}>Sarah</p><p style={{fontSize:7,color:c.fg3,margin:0}}>HR Manager</p></div></div></div>}
      </aside>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:44,borderBottom:"1px solid "+c.bd,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px",position:"sticky",top:0,zIndex:40,background:c.bg2}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}><button onClick={()=>setSb(!sb)} style={{background:c.bg3,border:"none",cursor:"pointer",padding:"4px 6px",borderRadius:6,fontSize:12}}>☰</button><span style={{fontSize:12,fontWeight:700}}>{NV.find(n=>n.id===pg)?.l}</span></div>
          <div style={{display:"flex",gap:4}}><button onClick={()=>setDk(!dk)} style={{background:c.bg3,border:"none",cursor:"pointer",padding:"4px 6px",borderRadius:6,fontSize:12}}>{dk?"☀️":"🌙"}</button><button onClick={()=>setSN(!sN)} style={{background:c.bg3,border:"none",cursor:"pointer",padding:"4px 6px",borderRadius:6,fontSize:12,position:"relative"}}>🔔{nf.filter(n=>!n.rd).length>0&&<span style={{position:"absolute",top:1,right:1,width:6,height:6,borderRadius:"50%",background:c.er}}/>}</button></div>
        </header>
        <main style={{flex:1,padding:16,overflowY:"auto"}}>
          {pg==="dash"&&<DashP/>}
          {pg==="tasks"&&<TaskP/>}
          {pg==="tpl"&&<TplP/>}
          {pg==="ana"&&<AnaP/>}
          {pg==="set"&&<SetP/>}
        </main>
      </div>
    </div>
  </div>;
}
