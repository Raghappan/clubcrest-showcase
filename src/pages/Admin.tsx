import { useState, useEffect } from "react";

export default function Admin() {
  const [operators, setOperators] = useState<any[]>([]);
  const [operations, setOperations] = useState<any[]>([]);
  const [newOperator, setNewOperator] = useState({ handle: "", name: "", rank: "", cell: "", region: "", specialty: "", joined: "" });
  const [newOperation, setNewOperation] = useState({ code: "", name: "", cell: "", status: "ACTIVE", desc: "", week: "" });
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch('/api/operators').then(r => r.json()).then(setOperators)
    fetch('/api/operations').then(r => r.json()).then(setOperations)
  }, [])

  const addOperator = async () => {
    await fetch('/api/operators', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newOperator) })
    fetch('/api/operators').then(r => r.json()).then(setOperators)
    setNewOperator({ handle: "", name: "", rank: "", cell: "", region: "", specialty: "", joined: "" })
  }

  const deleteOperator = async (id: string) => {
    await fetch(`/api/operators?id=${id}`, { method: 'DELETE' })
    setOperators(operators.filter(o => o._id !== id))
  }

  const addOperation = async () => {
    await fetch('/api/operations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newOperation, week: Number(newOperation.week) }) })
    fetch('/api/operations').then(r => r.json()).then(setOperations)
    setNewOperation({ code: "", name: "", cell: "", status: "ACTIVE", desc: "", week: "" })
  }

  const deleteOperation = async (id: string) => {
    await fetch(`/api/operations?id=${id}`, { method: 'DELETE' })
    setOperations(operations.filter(o => o._id !== id))
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0806] flex items-center justify-center font-mono">
        <div className="border border-[#1C1510] p-10 w-full max-w-sm">
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#7A6F68] mb-2">// restricted access</div>
          <h1 className="text-2xl font-black uppercase text-[#F5F0EB] mb-6">Enter <span className="text-[#FF5C2E]">Password</span></h1>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && password === "dxl2024") setAuthed(true);
            }}
            className="w-full bg-[#110D09] border border-[#1C1510] text-[#F5F0EB] p-3 text-sm font-mono focus:border-[#FF5C2E] focus:outline-none mb-4 placeholder:text-[#7A6F68]"
          />
          <button
            onClick={() => { if (password === "dxl2024") setAuthed(true); }}
            className="w-full px-4 py-3 bg-[#FF5C2E] text-[#0A0806] font-mono text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#F5F0EB] transition-colors">
            Access Panel →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0806] text-[#F5F0EB] p-8 font-mono">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="border-b border-[#1C1510] pb-6 mb-12">
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#7A6F68] mb-2">// internal access · restricted</div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-[#F5F0EB]">Admin <span className="text-[#FF5C2E]">Panel</span></h1>
          <p className="text-[#7A6F68] text-[11px] tracking-[0.2em] uppercase mt-1">Codex Syndicate · DXL · Guild 014</p>
        </div>

        {/* OPERATORS */}
        <div className="mb-16">
          <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#7A6F68] mb-2">01 ——— operators</h2>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Manage Roster</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {['handle','name','rank','cell','region','specialty','joined'].map(field => (
              <input key={field} placeholder={field}
                value={(newOperator as any)[field]}
                onChange={e => setNewOperator({...newOperator, [field]: e.target.value})}
                className="w-full bg-[#110D09] border border-[#1C1510] text-[#F5F0EB] p-2 text-sm font-mono focus:border-[#FF5C2E] focus:outline-none placeholder:text-[#7A6F68] placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest" />
            ))}
          </div>
          <button onClick={addOperator}
            className="px-4 py-2 bg-[#FF5C2E] text-[#0A0806] font-mono text-[11px] tracking-[0.2em] uppercase font-bold mb-8 hover:bg-[#F5F0EB] transition-colors">
            + Add Operator
          </button>

          <div className="border border-[#1C1510]">
            <div className="grid grid-cols-8 text-[9px] tracking-[0.22em] uppercase text-[#7A6F68] border-b border-[#1C1510] bg-[#110D09]">
              {['Handle','Name','Rank','Cell','Region','Specialty','Joined',''].map((h,i) => (
                <div key={i} className="p-3 border-r border-[#1C1510] last:border-r-0">{h}</div>
              ))}
            </div>
            {operators.map((o, i) => (
              <div key={o._id} className={`grid grid-cols-8 text-[12px] border-b border-[#1C1510] last:border-b-0 hover:bg-[#110D09] transition-colors ${i === 0 ? 'bg-[#FF5C2E]/5' : ''}`}>
                <div className="p-3 border-r border-[#1C1510] text-[#FF5C2E]">{o.handle}</div>
                <div className="p-3 border-r border-[#1C1510] font-bold">{o.name}</div>
                <div className="p-3 border-r border-[#1C1510] text-[#7A6F68] uppercase text-[10px] tracking-widest">{o.rank}</div>
                <div className="p-3 border-r border-[#1C1510] uppercase text-[10px] tracking-widest">{o.cell}</div>
                <div className="p-3 border-r border-[#1C1510] text-[#7A6F68]">{o.region}</div>
                <div className="p-3 border-r border-[#1C1510]">{o.specialty}</div>
                <div className="p-3 border-r border-[#1C1510] text-[#7A6F68]">{o.joined}</div>
                <div className="p-3 flex items-center justify-center">
                  <button onClick={() => deleteOperator(o._id)} className="text-[#FF5C2E] hover:text-[#F5F0EB] transition-colors text-lg">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OPERATIONS */}
        <div>
          <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#7A6F68] mb-2">02 ——— operations</h2>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Manage Operations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {['code','name','cell','status','desc','week'].map(field => (
              <input key={field} placeholder={field}
                value={(newOperation as any)[field]}
                onChange={e => setNewOperation({...newOperation, [field]: e.target.value})}
                className="w-full bg-[#110D09] border border-[#1C1510] text-[#F5F0EB] p-2 text-sm font-mono focus:border-[#FF5C2E] focus:outline-none placeholder:text-[#7A6F68] placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest" />
            ))}
          </div>
          <button onClick={addOperation}
            className="px-4 py-2 bg-[#FF5C2E] text-[#0A0806] font-mono text-[11px] tracking-[0.2em] uppercase font-bold mb-8 hover:bg-[#F5F0EB] transition-colors">
            + Add Operation
          </button>

          <div className="border border-[#1C1510]">
            <div className="grid grid-cols-7 text-[9px] tracking-[0.22em] uppercase text-[#7A6F68] border-b border-[#1C1510] bg-[#110D09]">
              {['Code','Name','Cell','Status','Description','Week',''].map((h,i) => (
                <div key={i} className="p-3 border-r border-[#1C1510] last:border-r-0">{h}</div>
              ))}
            </div>
            {operations.map((o) => (
              <div key={o._id} className="grid grid-cols-7 text-[12px] border-b border-[#1C1510] last:border-b-0 hover:bg-[#110D09] transition-colors">
                <div className="p-3 border-r border-[#1C1510] text-[#FF5C2E] font-mono text-[10px] tracking-widest">{o.code}</div>
                <div className="p-3 border-r border-[#1C1510] font-bold uppercase">{o.name}</div>
                <div className="p-3 border-r border-[#1C1510] text-[#7A6F68] uppercase text-[10px] tracking-widest">{o.cell}</div>
                <div className="p-3 border-r border-[#1C1510]">
                  <span className={`text-[9px] tracking-widest uppercase px-2 py-1 ${
                    o.status === 'ACTIVE' ? 'bg-[#FF5C2E] text-[#0A0806]' :
                    o.status === 'SHIPPED' ? 'bg-[#F5F0EB] text-[#0A0806]' :
                    o.status === 'REVIEW' ? 'bg-[#1C1510] text-[#F5F0EB] border border-[#FF5C2E]' :
                    'bg-[#110D09] text-[#7A6F68] border border-dashed border-[#1C1510]'
                  }`}>{o.status}</span>
                </div>
                <div className="p-3 border-r border-[#1C1510] text-[13px]">{o.desc}</div>
                <div className="p-3 border-r border-[#1C1510] font-black text-xl">{String(o.week).padStart(2,'0')}</div>
                <div className="p-3 flex items-center justify-center">
                  <button onClick={() => deleteOperation(o._id)} className="text-[#FF5C2E] hover:text-[#F5F0EB] transition-colors text-lg">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}