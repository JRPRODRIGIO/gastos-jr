import { useState, useMemo, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";

const CATEGORIAS = [
  { nombre: "Viajes",          emoji: "✈️",  color: "#3B82F6" },
  { nombre: "Comida",          emoji: "🍽️",  color: "#F97316" },
  { nombre: "Entretenimiento", emoji: "🎉",  color: "#A855F7" },
  { nombre: "Salud/Fitness",   emoji: "💪",  color: "#22C55E" },
  { nombre: "Supermercado",    emoji: "🛒",  color: "#EAB308" },
  { nombre: "Suscripciones",   emoji: "📱",  color: "#06B6D4" },
  { nombre: "Transporte",      emoji: "🚗",  color: "#EC4899" },
  { nombre: "Otros",           emoji: "📦",  color: "#94A3B8" },
];

const METODOS = ["Tarjeta", "Efectivo", "Transferencia"];
const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

const gastosSeed = [
  { id:1,  descripcion:"Vuelo a Vail",                    monto:10000, categoria:"Viajes",          metodo:"Tarjeta",      fecha:"2026-01-02" },
  { id:2,  descripcion:"Electrolit gym",                  monto:50,    categoria:"Salud/Fitness",   metodo:"Tarjeta",      fecha:"2026-01-03" },
  { id:3,  descripcion:"Restaurante Kai Cancún",          monto:1870,  categoria:"Comida",           metodo:"Tarjeta",      fecha:"2026-01-29" },
  { id:4,  descripcion:"ChatGPT",                         monto:355,   categoria:"Suscripciones",   metodo:"Tarjeta",      fecha:"2026-02-04" },
  { id:5,  descripcion:"Coursera",                        monto:670,   categoria:"Suscripciones",   metodo:"Tarjeta",      fecha:"2026-02-10" },
  { id:6,  descripcion:"Strana Antro",                    monto:2700,  categoria:"Entretenimiento", metodo:"Transferencia",fecha:"2026-02-27" },
  { id:7,  descripcion:"Gasolina",                        monto:1750,  categoria:"Transporte",      metodo:"Efectivo",     fecha:"2026-03-01" },
  { id:8,  descripcion:"Suscripción OpenAI ChatGPT",      monto:356,   categoria:"Suscripciones",   metodo:"Tarjeta",      fecha:"2026-03-03" },
  { id:9,  descripcion:"Matcha",                          monto:30,    categoria:"Comida",           metodo:"Tarjeta",      fecha:"2026-03-05" },
  { id:10, descripcion:"Yogurt Zozen",                    monto:220,   categoria:"Supermercado",    metodo:"Efectivo",     fecha:"2026-03-06" },
  { id:11, descripcion:"Cena con Raquel en Abisal",       monto:1000,  categoria:"Comida",           metodo:"Efectivo",     fecha:"2026-03-06" },
  { id:12, descripcion:"Litros de tequila en el estadio", monto:300,   categoria:"Entretenimiento", metodo:"Efectivo",     fecha:"2026-03-07" },
  { id:13, descripcion:"Cover Toto",                      monto:250,   categoria:"Entretenimiento", metodo:"Efectivo",     fecha:"2026-03-07" },
  { id:14, descripcion:"Mesa Toto Antro",                 monto:1950,  categoria:"Entretenimiento", metodo:"Transferencia",fecha:"2026-03-07" },
];

const STORAGE_KEY = "gastos-jr-data";

function cargarGastos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return gastosSeed;
}

const formatMXN = (n) =>
  new Intl.NumberFormat("es-MX", { style:"currency", currency:"MXN", minimumFractionDigits:0 }).format(n);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background:"#1a1a2e", border:"1px solid #2d2d4e", borderRadius:8, padding:"10px 14px" }}>
        <p style={{ color:"#94a3b8", fontSize:12, margin:"0 0 4px" }}>{label}</p>
        <p style={{ color:"#f97316", fontWeight:700, margin:0, fontSize:14 }}>{formatMXN(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const MetodoBadge = ({ metodo }) => {
  const cfg = { Tarjeta:["#3b82f6","💳"], Efectivo:["#22c55e","💵"], Transferencia:["#a855f7","🔄"] };
  const [color, icon] = cfg[metodo] || ["#94a3b8","💰"];
  return (
    <span style={{ background:`${color}22`, color, fontSize:11, fontWeight:700, borderRadius:6, padding:"2px 8px", whiteSpace:"nowrap" }}>
      {icon} {metodo}
    </span>
  );
};

export default function App() {
  const [gastos, setGastos]   = useState(cargarGastos);
  const [vista, setVista]     = useState("dashboard");
  const [form, setForm]       = useState({ descripcion:"", monto:"", categoria:"Comida", metodo:"Tarjeta", fecha: new Date().toISOString().split("T")[0] });
  const [filtroMes, setFiltroMes] = useState("todos");
  const [toast, setToast]     = useState(null);
  const [gastoEditando, setGastoEditando] = useState(null);
  const [formEdit, setFormEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));
  }, [gastos]);

  const mostrarToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const agregarGasto = () => {
    if (!form.descripcion || !form.monto || isNaN(Number(form.monto))) return;
    setGastos(prev => [{ ...form, monto: Number(form.monto), id: Date.now() }, ...prev]);
    setForm({ descripcion:"", monto:"", categoria:"Comida", metodo:"Tarjeta", fecha: new Date().toISOString().split("T")[0] });
    mostrarToast("✅ Gasto registrado");
  };

  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const eliminarGasto = (id) => {
    setGastos(prev => prev.filter(g => g.id !== id));
    setConfirmarEliminar(null);
    mostrarToast("🗑️ Gasto eliminado");
  };

  const abrirEdicion = (g) => {
    setGastoEditando(g.id);
    setFormEdit({ descripcion: g.descripcion, monto: String(g.monto), categoria: g.categoria, metodo: g.metodo, fecha: g.fecha });
  };

  const guardarEdicion = () => {
    if (!formEdit.descripcion || !formEdit.monto || isNaN(Number(formEdit.monto))) return;
    setGastos(prev => prev.map(g => g.id === gastoEditando ? { ...g, ...formEdit, monto: Number(formEdit.monto) } : g));
    setGastoEditando(null);
    setFormEdit(null);
    mostrarToast("✅ Gasto actualizado");
  };

  const gastosFiltrados = useMemo(() =>
    filtroMes === "todos" ? gastos : gastos.filter(g => new Date(g.fecha).getMonth() === Number(filtroMes)),
    [gastos, filtroMes]
  );

  const total = gastosFiltrados.reduce((s,g) => s+g.monto, 0);

  const porMes = useMemo(() => {
    const mapa = {};
    gastos.forEach(g => { const m = new Date(g.fecha).getMonth(); mapa[m] = (mapa[m]||0)+g.monto; });
    return Object.entries(mapa).sort((a,b)=>a[0]-b[0]).map(([m,t])=>({ mes:MESES[m], total:t }));
  }, [gastos]);

  const porCategoria = useMemo(() => {
    const mapa = {};
    gastosFiltrados.forEach(g => { mapa[g.categoria] = (mapa[g.categoria]||0)+g.monto; });
    return Object.entries(mapa)
      .map(([cat,val]) => { const c = CATEGORIAS.find(x=>x.nombre===cat); return { name:cat, value:val, color:c?.color||"#94a3b8", emoji:c?.emoji||"📦" }; })
      .sort((a,b)=>b.value-a.value);
  }, [gastosFiltrados]);

  const porMetodo = useMemo(() => {
    const mapa = {};
    gastosFiltrados.forEach(g => { mapa[g.metodo] = (mapa[g.metodo]||0)+g.monto; });
    const colores = { Tarjeta:"#3b82f6", Efectivo:"#22c55e", Transferencia:"#a855f7" };
    return Object.entries(mapa).map(([m,v])=>({ name:m, value:v, color:colores[m]||"#94a3b8" }));
  }, [gastosFiltrados]);

  const topGasto = gastosFiltrados.reduce((max,g)=>g.monto>(max?.monto||0)?g:max, null);

  const NAV = [
    { key:"dashboard", label:"Dashboard", emoji:"📊" },
    { key:"agregar",   label:"Agregar",   emoji:"➕" },
    { key:"historial", label:"Historial", emoji:"📋" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#0d0d1a", color:"#e2e8f0", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed",top:20,right:20,zIndex:999,background:"#1e1e3a",border:"1px solid #3b3b6b",borderRadius:10,padding:"12px 20px",fontSize:14,boxShadow:"0 8px 32px rgba(0,0,0,.4)" }}>
          {toast}
        </div>
      )}

      {/* ── MODAL EDICIÓN ── */}
      {gastoEditando && formEdit && (
        <div style={{ position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:16 }} onClick={e=>{ if(e.target===e.currentTarget){ setGastoEditando(null); setFormEdit(null); } }}>
          <div style={{ background:"#11112a",border:"1px solid #2d2d4e",borderRadius:18,padding:24,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto" }}>
            <div style={{ fontWeight:800,fontSize:18,marginBottom:4 }}>✏️ Editar gasto</div>
            <div style={{ color:"#64748b",fontSize:13,marginBottom:20 }}>Modifica los datos del gasto</div>

            {[
              { label:"📝 Descripción", key:"descripcion", type:"text",   ph:"Ej: Cena en restaurante" },
              { label:"💵 Monto (MXN)", key:"monto",       type:"number", ph:"Ej: 850" },
              { label:"📅 Fecha",       key:"fecha",        type:"date",   ph:"" },
            ].map(f=>(
              <div key={f.key} style={{ marginBottom:14 }}>
                <label style={{ display:"block",fontSize:13,color:"#94a3b8",marginBottom:6,fontWeight:600 }}>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={formEdit[f.key]}
                  onChange={e=>setFormEdit(p=>({...p,[f.key]:e.target.value}))}
                  style={{ width:"100%",background:"#0d0d1a",border:"1px solid #2d2d4e",borderRadius:10,padding:"12px 14px",color:"#e2e8f0",fontSize:15,outline:"none",boxSizing:"border-box" }}
                />
              </div>
            ))}

            {/* Método de pago */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block",fontSize:13,color:"#94a3b8",marginBottom:8,fontWeight:600 }}>💳 Método de pago</label>
              <div style={{ display:"flex",gap:8 }}>
                {METODOS.map(m=>{
                  const cfg={Tarjeta:["#3b82f6","💳"],Efectivo:["#22c55e","💵"],Transferencia:["#a855f7","🔄"]};
                  const [color,icon]=cfg[m];
                  const sel=formEdit.metodo===m;
                  return (
                    <button key={m} onClick={()=>setFormEdit(p=>({...p,metodo:m}))} style={{
                      flex:1,background:sel?`${color}33`:"#1a1a2e",
                      border:`1px solid ${sel?color:"#2d2d4e"}`,borderRadius:10,padding:"10px 4px",cursor:"pointer",
                      display:"flex",flexDirection:"column",alignItems:"center",gap:4,minHeight:56
                    }}>
                      <span style={{ fontSize:20 }}>{icon}</span>
                      <span style={{ fontSize:11,color:sel?color:"#64748b",fontWeight:600 }}>{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categorías */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block",fontSize:13,color:"#94a3b8",marginBottom:8,fontWeight:600 }}>🏷️ Categoría</label>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }}>
                {CATEGORIAS.map(cat=>{
                  const sel=formEdit.categoria===cat.nombre;
                  return (
                    <button key={cat.nombre} onClick={()=>setFormEdit(p=>({...p,categoria:cat.nombre}))} style={{
                      background:sel?`${cat.color}33`:"#1a1a2e",
                      border:`1px solid ${sel?cat.color:"#2d2d4e"}`,borderRadius:10,padding:"8px 4px",cursor:"pointer",
                      display:"flex",flexDirection:"column",alignItems:"center",gap:3,minHeight:54
                    }}>
                      <span style={{ fontSize:18 }}>{cat.emoji}</span>
                      <span style={{ fontSize:10,color:sel?cat.color:"#64748b",fontWeight:600,textAlign:"center",lineHeight:1.2 }}>{cat.nombre}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display:"flex",gap:10 }}>
              <button onClick={()=>{ setGastoEditando(null); setFormEdit(null); }} style={{
                flex:1,background:"#1a1a2e",border:"1px solid #2d2d4e",borderRadius:12,padding:"13px",
                color:"#94a3b8",fontWeight:700,fontSize:14,cursor:"pointer"
              }}>Cancelar</button>
              <button onClick={guardarEdicion} style={{
                flex:2,background:"linear-gradient(135deg,#3b82f6,#a855f7)",
                border:"none",borderRadius:12,padding:"13px",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"
              }}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL CONFIRMAR ELIMINAR ── */}
      {confirmarEliminar && (
        <div style={{ position:"fixed",inset:0,zIndex:910,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",padding:16 }} onClick={e=>{ if(e.target===e.currentTarget) setConfirmarEliminar(null); }}>
          <div style={{ background:"#11112a",border:"1px solid #2d2d4e",borderRadius:18,padding:28,width:"100%",maxWidth:360,textAlign:"center" }}>
            <div style={{ fontSize:48,marginBottom:12 }}>🗑️</div>
            <div style={{ fontWeight:800,fontSize:18,marginBottom:8 }}>¿Eliminar gasto?</div>
            <div style={{ color:"#94a3b8",fontSize:14,marginBottom:6 }}>{confirmarEliminar.descripcion}</div>
            <div style={{ color:"#64748b",fontSize:13,marginBottom:24 }}>Esta acción no se puede deshacer.</div>
            <div style={{ display:"flex",gap:10 }}>
              <button onClick={()=>setConfirmarEliminar(null)} style={{ flex:1,background:"#1a1a2e",border:"1px solid #2d2d4e",borderRadius:12,padding:"13px",color:"#94a3b8",fontWeight:700,fontSize:14,cursor:"pointer" }}>Cancelar</button>
              <button onClick={()=>eliminarGasto(confirmarEliminar.id)} style={{ flex:1,background:"#ef444422",border:"1px solid #ef4444",borderRadius:12,padding:"13px",color:"#ef4444",fontWeight:800,fontSize:14,cursor:"pointer" }}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="header-wrap" style={{ background:"#11112a", borderBottom:"1px solid #1e1e3a", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ background:"linear-gradient(135deg,#3b82f6,#a855f7)", borderRadius:12, width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>💳</div>
          <div>
            <div style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px" }}>Gastos <span style={{ color:"#3b82f6" }}>JR</span></div>
            <div style={{ fontSize:11, color:"#64748b" }}>Control financiero personal · 2026</div>
          </div>
        </div>
        {/* Nav en desktop */}
        <div className="header-nav" style={{ display:"flex", gap:8 }}>
          {NAV.map(n => (
            <button key={n.key} onClick={()=>setVista(n.key)} style={{
              background: vista===n.key ? "linear-gradient(135deg,#3b82f6,#a855f7)" : "#1a1a2e",
              color: vista===n.key ? "#fff" : "#64748b",
              border:"none", borderRadius:8, padding:"8px 14px", cursor:"pointer", fontWeight:600, fontSize:13
            }}>{n.emoji} {n.label}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENIDO ── */}
      <div className="content-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>

        {/* ── DASHBOARD ── */}
        {vista==="dashboard" && (
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Filtro mes */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ color:"#64748b", fontSize:13 }}>Mes:</span>
              <select value={filtroMes} onChange={e=>setFiltroMes(e.target.value)} style={{ background:"#1a1a2e",color:"#e2e8f0",border:"1px solid #2d2d4e",borderRadius:8,padding:"6px 12px",fontSize:13 }}>
                <option value="todos">Todos</option>
                {MESES.map((m,i)=><option key={i} value={i}>{m}</option>)}
              </select>
            </div>

            {/* KPIs — 2 cols en móvil, 4 en desktop */}
            <div className="kpi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              {[
                { label:"Total gastado",  value:formatMXN(total),                                                          icon:"💸", color:"#3b82f6" },
                { label:"Núm. de gastos", value:gastosFiltrados.length,                                                    icon:"📝", color:"#a855f7" },
                { label:"Categoría top",  value:porCategoria[0]?`${porCategoria[0].emoji} ${porCategoria[0].name}`:"—",    icon:"🏆", color:"#f97316" },
                { label:"Gasto más alto", value:topGasto?formatMXN(topGasto.monto):"—",                                   icon:"📈", color:"#22c55e" },
              ].map((k,i)=>(
                <div key={i} style={{ background:"#11112a",border:"1px solid #1e1e3a",borderRadius:14,padding:"16px" }}>
                  <div style={{ fontSize:24,marginBottom:6 }}>{k.icon}</div>
                  <div className="kpi-value" style={{ fontSize:20,fontWeight:800,color:k.color,wordBreak:"break-word" }}>{k.value}</div>
                  <div style={{ fontSize:11,color:"#64748b",marginTop:4 }}>{k.label}</div>
                </div>
              ))}
            </div>

            {/* Gráficas fila 1 — side by side en desktop, apiladas en móvil */}
            <div className="chart-row-1" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

              {/* Barras por mes */}
              <div style={{ background:"#11112a",border:"1px solid #1e1e3a",borderRadius:14,padding:"20px",minWidth:0 }}>
                <div style={{ fontWeight:700,marginBottom:16,fontSize:14 }}>📅 Gasto por mes</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={porMes} barSize={28} margin={{left:0,right:8,top:4,bottom:0}}>
                    <XAxis dataKey="mes" tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:"#64748b",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} width={36}/>
                    <Tooltip content={<CustomTooltip/>} cursor={{fill:"rgba(59,130,246,.06)"}}/>
                    <Bar dataKey="total" radius={[6,6,0,0]}>
                      {porMes.map((_,i)=><Cell key={i} fill={i===porMes.length-1?"#3b82f6":"#2d2d4e"}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie categorías */}
              <div style={{ background:"#11112a",border:"1px solid #1e1e3a",borderRadius:14,padding:"20px",minWidth:0 }}>
                <div style={{ fontWeight:700,marginBottom:16,fontSize:14 }}>🥧 Por categoría</div>
                <div className="pie-layout" style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <div className="pie-chart-wrap" style={{ width:"50%",flexShrink:0 }}>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie data={porCategoria} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                          {porCategoria.map((c,i)=><Cell key={i} fill={c.color}/>)}
                        </Pie>
                        <Tooltip formatter={v=>formatMXN(v)}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ flex:1,display:"flex",flexDirection:"column",gap:7,minWidth:0 }}>
                    {porCategoria.map((c,i)=>(
                      <div key={i} style={{ display:"flex",alignItems:"center",gap:6 }}>
                        <div style={{ width:8,height:8,borderRadius:"50%",background:c.color,flexShrink:0 }}/>
                        <span style={{ fontSize:11,color:"#94a3b8",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{c.emoji} {c.name}</span>
                        <span style={{ fontSize:11,fontWeight:700,flexShrink:0 }}>{formatMXN(c.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficas fila 2 */}
            <div className="chart-row-2" style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16 }}>

              {/* Línea tendencia */}
              <div style={{ background:"#11112a",border:"1px solid #1e1e3a",borderRadius:14,padding:"20px",minWidth:0 }}>
                <div style={{ fontWeight:700,marginBottom:16,fontSize:14 }}>📈 Tendencia mensual</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={porMes} margin={{left:0,right:8,top:4,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a"/>
                    <XAxis dataKey="mes" tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:"#64748b",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} width={36}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2.5} dot={{fill:"#3b82f6",r:4}} activeDot={{r:6}}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie método de pago */}
              <div style={{ background:"#11112a",border:"1px solid #1e1e3a",borderRadius:14,padding:"20px",minWidth:0 }}>
                <div style={{ fontWeight:700,marginBottom:16,fontSize:14 }}>💳 Método de pago</div>
                <ResponsiveContainer width="100%" height={130}>
                  <PieChart>
                    <Pie data={porMetodo} cx="50%" cy="50%" outerRadius={55} dataKey="value" strokeWidth={0}>
                      {porMetodo.map((c,i)=><Cell key={i} fill={c.color}/>)}
                    </Pie>
                    <Tooltip formatter={v=>formatMXN(v)}/>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display:"flex",flexDirection:"column",gap:6,marginTop:8 }}>
                  {porMetodo.map((m,i)=>(
                    <div key={i} style={{ display:"flex",alignItems:"center",gap:6 }}>
                      <div style={{ width:8,height:8,borderRadius:"50%",background:m.color,flexShrink:0 }}/>
                      <span style={{ fontSize:11,color:"#94a3b8",flex:1 }}>{m.name}</span>
                      <span style={{ fontSize:11,fontWeight:700 }}>{formatMXN(m.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── AGREGAR ── */}
        {vista==="agregar" && (
          <div style={{ maxWidth:500,margin:"0 auto" }}>
            <div style={{ background:"#11112a",border:"1px solid #1e1e3a",borderRadius:16,padding:"24px" }}>
              <div style={{ fontWeight:800,fontSize:20,marginBottom:6 }}>➕ Registrar gasto</div>
              <div style={{ color:"#64748b",fontSize:13,marginBottom:24 }}>Agrega un nuevo gasto a tu registro</div>

              {[
                { label:"📝 Descripción", key:"descripcion", type:"text",   ph:"Ej: Cena en restaurante" },
                { label:"💵 Monto (MXN)", key:"monto",       type:"number", ph:"Ej: 850" },
                { label:"📅 Fecha",       key:"fecha",        type:"date",   ph:"" },
              ].map(f=>(
                <div key={f.key} style={{ marginBottom:16 }}>
                  <label style={{ display:"block",fontSize:13,color:"#94a3b8",marginBottom:6,fontWeight:600 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]}
                    onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    style={{ width:"100%",background:"#0d0d1a",border:"1px solid #2d2d4e",borderRadius:10,padding:"14px",color:"#e2e8f0",fontSize:16,outline:"none",boxSizing:"border-box" }}
                  />
                </div>
              ))}

              {/* Método de pago */}
              <div style={{ marginBottom:18 }}>
                <label style={{ display:"block",fontSize:13,color:"#94a3b8",marginBottom:8,fontWeight:600 }}>💳 Método de pago</label>
                <div style={{ display:"flex",gap:8 }}>
                  {METODOS.map(m=>{
                    const cfg={Tarjeta:["#3b82f6","💳"],Efectivo:["#22c55e","💵"],Transferencia:["#a855f7","🔄"]};
                    const [color,icon]=cfg[m];
                    const sel=form.metodo===m;
                    return (
                      <button key={m} onClick={()=>setForm(p=>({...p,metodo:m}))} style={{
                        flex:1,background:sel?`${color}33`:"#1a1a2e",
                        border:`1px solid ${sel?color:"#2d2d4e"}`,borderRadius:10,padding:"12px 4px",cursor:"pointer",
                        display:"flex",flexDirection:"column",alignItems:"center",gap:4,minHeight:64
                      }}>
                        <span style={{ fontSize:22 }}>{icon}</span>
                        <span style={{ fontSize:11,color:sel?color:"#64748b",fontWeight:600 }}>{m}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categorías */}
              <div style={{ marginBottom:24 }}>
                <label style={{ display:"block",fontSize:13,color:"#94a3b8",marginBottom:8,fontWeight:600 }}>🏷️ Categoría</label>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }}>
                  {CATEGORIAS.map(cat=>{
                    const sel=form.categoria===cat.nombre;
                    return (
                      <button key={cat.nombre} onClick={()=>setForm(p=>({...p,categoria:cat.nombre}))} style={{
                        background:sel?`${cat.color}33`:"#1a1a2e",
                        border:`1px solid ${sel?cat.color:"#2d2d4e"}`,borderRadius:10,padding:"10px 4px",cursor:"pointer",
                        display:"flex",flexDirection:"column",alignItems:"center",gap:4,minHeight:60
                      }}>
                        <span style={{ fontSize:20 }}>{cat.emoji}</span>
                        <span style={{ fontSize:10,color:sel?cat.color:"#64748b",fontWeight:600,textAlign:"center",lineHeight:1.2 }}>{cat.nombre}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button onClick={agregarGasto} style={{
                width:"100%",background:"linear-gradient(135deg,#3b82f6,#a855f7)",
                border:"none",borderRadius:12,padding:"16px",color:"#fff",fontWeight:800,fontSize:16,cursor:"pointer"
              }}>Guardar Gasto</button>
            </div>
          </div>
        )}

        {/* ── HISTORIAL ── */}
        {vista==="historial" && (
          <div>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20 }}>
              <div style={{ fontWeight:800,fontSize:18 }}>📋 Historial de gastos</div>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ color:"#64748b",fontSize:13 }}>Mes:</span>
                <select value={filtroMes} onChange={e=>setFiltroMes(e.target.value)} style={{ background:"#1a1a2e",color:"#e2e8f0",border:"1px solid #2d2d4e",borderRadius:8,padding:"6px 12px",fontSize:13 }}>
                  <option value="todos">Todos</option>
                  {MESES.map((m,i)=><option key={i} value={i}>{m}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {gastosFiltrados.length===0 && (
                <div style={{ textAlign:"center",padding:60,color:"#64748b" }}>
                  <div style={{ fontSize:48,marginBottom:12 }}>🗂️</div>
                  <div>No hay gastos en este mes</div>
                </div>
              )}
              {gastosFiltrados.map(g=>{
                const cat=CATEGORIAS.find(c=>c.nombre===g.categoria);
                return (
                  <div key={g.id} style={{ background:"#11112a",border:"1px solid #1e1e3a",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12 }}>
                    <div style={{ width:42,height:42,borderRadius:12,flexShrink:0,background:`${cat?.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>
                      {cat?.emoji}
                    </div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontWeight:700,fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{g.descripcion}</div>
                      <div style={{ fontSize:12,color:"#64748b",marginTop:3,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                        <span>{g.categoria}</span>
                        <span>·</span>
                        <span>{new Date(g.fecha+"T12:00:00").toLocaleDateString("es-MX",{day:"numeric",month:"short"})}</span>
                        <span>·</span>
                        <MetodoBadge metodo={g.metodo}/>
                      </div>
                    </div>
                    <div style={{ fontWeight:800,fontSize:15,color:cat?.color,flexShrink:0 }}>{formatMXN(g.monto)}</div>
                    <button onClick={()=>abrirEdicion(g)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:18,padding:6,borderRadius:6,flexShrink:0 }} title="Editar">✏️</button>
                    <button onClick={()=>setConfirmarEliminar(g)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:18,padding:6,borderRadius:6,flexShrink:0 }} title="Eliminar">🗑️</button>
                  </div>
                );
              })}
            </div>

            {gastosFiltrados.length>0 && (
              <div style={{ marginTop:16,background:"#11112a",border:"1px solid #1e1e3a",borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between" }}>
                <span style={{ color:"#64748b",fontWeight:600 }}>Total ({gastosFiltrados.length} gastos)</span>
                <span style={{ fontWeight:800,fontSize:18,color:"#3b82f6" }}>{formatMXN(total)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── NAV INFERIOR (solo móvil) ── */}
      <nav className="bottom-nav">
        {NAV.map(n => (
          <button key={n.key} onClick={()=>setVista(n.key)} className={`bottom-nav-btn${vista===n.key?" active":""}`}>
            <span style={{ fontSize:22 }}>{n.emoji}</span>
            <span style={{ fontSize:10, fontWeight:700 }}>{n.label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0d0d1a; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(.4); }
        select option { background: #1a1a2e; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d1a; }
        ::-webkit-scrollbar-thumb { background: #2d2d4e; border-radius: 4px; }

        /* Safe area + header */
        .header-wrap {
          padding: calc(16px + env(safe-area-inset-top)) 24px 16px;
        }

        /* Bottom nav — oculta en desktop */
        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #11112a;
          border-top: 1px solid #1e1e3a;
          padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
          z-index: 100;
          justify-content: space-around;
          align-items: center;
        }
        .bottom-nav-btn {
          flex: 1;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6px 0;
          color: #64748b;
          min-height: 52px;
          justify-content: center;
        }
        .bottom-nav-btn.active {
          color: #3b82f6;
        }
        .bottom-nav-btn.active span:first-child {
          filter: drop-shadow(0 0 6px #3b82f680);
        }

        /* ── RESPONSIVE MÓVIL (≤ 640px) ── */
        @media (max-width: 640px) {
          /* Ocultar nav del header, mostrar bottom nav */
          .header-nav { display: none !important; }
          .bottom-nav { display: flex !important; }

          /* Padding inferior del contenido para no quedar bajo el bottom nav */
          .content-wrap {
            padding: 16px 12px calc(80px + env(safe-area-inset-bottom)) !important;
          }

          /* KPIs: 2 columnas */
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .kpi-value {
            font-size: 16px !important;
          }

          /* Gráficas: una columna */
          .chart-row-1 {
            grid-template-columns: 1fr !important;
          }
          .chart-row-2 {
            grid-template-columns: 1fr !important;
          }

          /* Pie categorías: pie encima, leyenda abajo */
          .pie-layout {
            flex-direction: column !important;
            align-items: center !important;
          }
          .pie-chart-wrap {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
