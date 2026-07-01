import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, Play, Database, Table, HelpCircle, Code, Workflow, CheckCircle, Clock } from 'lucide-react';
import { MOCK_ENDPOINTS } from '../data';
import { ApiEndpoint } from '../types';

export default function InteractiveTerminal() {
  const [activeMode, setActiveMode] = useState<'api' | 'db'>('api');
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(MOCK_ENDPOINTS[0]);
  const [customBody, setCustomBody] = useState<string>(selectedEndpoint.requestBody || '');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  
  // Database map state
  const [selectedTable, setSelectedTable] = useState<string>('users');

  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setCustomBody(endpoint.requestBody || '');
    setApiResponse(null);
    setConsoleLogs([]);
  };

  const executeApiCall = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setApiResponse(null);
    setConsoleLogs([]);

    const logs = [
      `[HTTP CLIENT] Sending ${selectedEndpoint.method} request to host: ${window.location.origin}${selectedEndpoint.path}...`,
      `[NEST.JS CORE] Request received by controller. Invoking guard validation pipeline...`,
      `[AUTH GUARD] Passport JWT validation: SUCCESS. Principal set to Zain ul Abideen (zainmir9582@gmail.com)`,
    ];

    // Stream logs for interactive terminal vibe
    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setConsoleLogs((prev) => [...prev, logs[i]]);
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    setConsoleLogs((prev) => [
      ...prev,
      `[TYPEORM SERVICE] Hydrating repository metadata. Dispatching SQL instruction:`,
    ]);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setConsoleLogs((prev) => [...prev, `\x1b[35m${selectedEndpoint.dbQuery}`]);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setConsoleLogs((prev) => [
      ...prev,
      `[MYSQL DB] 1 row affected. Relational query returned status: OK.`,
      `[HTTP GATEWAY] Serialization complete. Returning response with Status ${selectedEndpoint.method === 'POST' ? '201 Created' : '200 OK'}.`,
    ]);

    // Apply custom body edits if studentId/courseId was changed (simulate mock behavior)
    let finalResponse = selectedEndpoint.responseBody;
    if (selectedEndpoint.method === 'POST' && customBody) {
      try {
        const parsed = JSON.parse(customBody);
        const originalResponseParsed = JSON.parse(selectedEndpoint.responseBody);
        
        if (parsed.studentId) originalResponseParsed.studentId = parsed.studentId;
        if (parsed.courseId) originalResponseParsed.courseId = parsed.courseId;
        if (parsed.userId) originalResponseParsed.userId = parsed.userId;
        
        finalResponse = JSON.stringify(originalResponseParsed, null, 2);
      } catch (err) {
        // Fallback to normal if editing broke JSON format
      }
    }

    setApiResponse(finalResponse);
    setIsRunning(false);
  };

  const dbSchema = {
    users: {
      columns: [
        { name: 'id', type: 'varchar(36)', key: 'PK', desc: 'Unique UUID key identifier' },
        { name: 'name', type: 'varchar(100)', key: '', desc: 'Full profile name' },
        { name: 'email', type: 'varchar(150)', key: 'UNIQUE', desc: 'User electronic mail handle' },
        { name: 'role', type: 'enum("Admin", "Student", "Instructor")', key: '', desc: 'Authorization role' },
        { name: 'createdAt', type: 'timestamp', key: '', desc: 'Record insertion time' },
      ],
      relations: ['enrollments.userId (1 to Many)', 'courses.instructorId (1 to Many)']
    },
    courses: {
      columns: [
        { name: 'id', type: 'varchar(36)', key: 'PK', desc: 'Unique course code' },
        { name: 'title', type: 'varchar(200)', key: '', desc: 'Curriculum course header' },
        { name: 'description', type: 'text', key: '', desc: 'Syllabus and description block' },
        { name: 'category', type: 'varchar(50)', key: '', desc: 'Tag grouping e.g. Full-Stack' },
        { name: 'instructorId', type: 'varchar(36)', key: 'FK', desc: 'References users.id' },
        { name: 'createdAt', type: 'timestamp', key: '', desc: 'Creation entry timestamp' },
      ],
      relations: ['users.id (Many to 1 via instructorId)', 'lessons.courseId (1 to Many)', 'enrollments.courseId (1 to Many)']
    },
    enrollments: {
      columns: [
        { name: 'id', type: 'varchar(36)', key: 'PK', desc: 'Primary enrollment ticket key' },
        { name: 'userId', type: 'varchar(36)', key: 'FK', desc: 'References users.id' },
        { name: 'courseId', type: 'varchar(36)', key: 'FK', desc: 'References courses.id' },
        { name: 'progress', type: 'int', key: '', desc: 'Percent complete marker (0-100)' },
        { name: 'enrolledAt', type: 'timestamp', key: '', desc: 'Relational mapping timestamp' },
      ],
      relations: ['users.id (Many to 1 via userId)', 'courses.id (Many to 1 via courseId)']
    },
    lessons: {
      columns: [
        { name: 'id', type: 'varchar(36)', key: 'PK', desc: 'Primary lesson key' },
        { name: 'courseId', type: 'varchar(36)', key: 'FK', desc: 'References courses.id' },
        { name: 'title', type: 'varchar(200)', key: '', desc: 'Lecture session title' },
        { name: 'videoUrl', type: 'varchar(255)', key: '', desc: 'S3 streaming media path' },
        { name: 'sortOrder', type: 'int', key: '', desc: 'Course sequence scheduling' },
      ],
      relations: ['courses.id (Many to 1 via courseId)']
    },
    convocation_tickets: {
      columns: [
        { name: 'id', type: 'varchar(36)', key: 'PK', desc: 'Unique ticket receipt ID' },
        { name: 'studentId', type: 'varchar(30)', key: 'FK', desc: 'VUID number e.g. BC20040433' },
        { name: 'seatNumber', type: 'varchar(10)', key: 'UNIQUE', desc: 'Locked auditorium seat code' },
        { name: 'ticketCode', type: 'varchar(50)', key: 'UNIQUE', desc: 'Custom ticket validation code' },
        { name: 'status', type: 'enum("WAITING", "STAGE", "CLEARED")', key: '', desc: 'Current live queue zone' },
      ],
      relations: ['None (Relates dynamically using student registry codes)']
    }
  };

  return (
    <section id="playground" className="py-24 bg-[#0a0e17] relative border-t border-slate-900">
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">Interactive Developer Sandbox</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Live Full-Stack Simulator
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Test custom API requests, observe database transactions, and examine relational table mappings built exactly with Zain's tech-stack.
          </p>
        </div>

        {/* Sandbox Frame */}
        <div className="rounded-2xl border border-slate-800 bg-[#090d16] overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveMode('api')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeMode === 'api'
                    ? 'bg-blue-600/15 border border-blue-500/40 text-blue-400'
                    : 'border border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="h-4 w-4" />
                <span>API Client (Postman)</span>
              </button>
              <button
                onClick={() => setActiveMode('db')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeMode === 'db'
                    ? 'bg-blue-600/15 border border-blue-500/40 text-blue-400'
                    : 'border border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Workflow className="h-4 w-4" />
                <span>Database Map (dbdiagram)</span>
              </button>
            </div>

            {/* Core indicators */}
            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                <span>NEST API: ONLINE</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                <span>MYSQL: CONNECTED</span>
              </span>
            </div>
          </div>

          {/* Core Content Area */}
          <div className="p-6 min-h-[480px]">
            <AnimatePresence mode="wait">
              
              {/* API Client Mode */}
              {activeMode === 'api' && (
                <motion.div
                  key="api-mode"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  {/* Left Column: Endpoints selector */}
                  <div className="lg:col-span-4 space-y-3">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-2">Endpoint Selection</h4>
                    <div className="space-y-2">
                      {MOCK_ENDPOINTS.map((endpoint) => {
                        const isSelected = selectedEndpoint.path === endpoint.path;
                        const methodColors = {
                          GET: 'text-green-400 bg-green-500/10 border-green-500/20',
                          POST: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
                          PUT: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
                          DELETE: 'text-red-400 bg-red-500/10 border-red-500/20',
                        };

                        return (
                          <button
                            key={endpoint.path}
                            onClick={() => handleEndpointSelect(endpoint)}
                            className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-slate-900 border-blue-500 text-white shadow-md'
                                : 'bg-[#090d16] border-slate-800 text-slate-400 hover:border-slate-700/80 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className={`px-2 py-0.5 rounded font-mono font-extrabold text-[10px] border ${methodColors[endpoint.method]}`}>
                                {endpoint.method}
                              </span>
                              <span className="font-mono text-xs truncate">{endpoint.path}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Endpoint explanation info card */}
                    <div className="bg-[#0c1221] border border-slate-800 rounded-xl p-4 mt-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Routing Description</span>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {selectedEndpoint.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Playground inputs, terminals, and results */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Trigger Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 text-xs font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded">
                          {selectedEndpoint.method}
                        </span>
                        <span className="font-mono text-sm text-slate-200 font-medium">{selectedEndpoint.path}</span>
                      </div>

                      <button
                        onClick={executeApiCall}
                        disabled={isRunning}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          isRunning
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10'
                        }`}
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>{isRunning ? 'Sending...' : 'Send Request'}</span>
                      </button>
                    </div>

                    {/* Editable Payload if POST */}
                    {selectedEndpoint.method === 'POST' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Payload Parameters (Editable JSON)</label>
                        <textarea
                          rows={3}
                          value={customBody}
                          onChange={(e) => setCustomBody(e.target.value)}
                          className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                        ></textarea>
                      </div>
                    )}

                    {/* Terminal Window */}
                    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
                      {/* Terminal header */}
                      <div className="bg-[#0d1222] px-4 py-2 border-b border-slate-800/80 flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-[10px] font-mono text-slate-400">Server Logs Terminal</span>
                      </div>
                      
                      {/* Terminal body logs */}
                      <div className="p-4 h-44 overflow-y-auto font-mono text-[11px] space-y-1.5 text-slate-300 scrollbar-thin">
                        {consoleLogs.length === 0 ? (
                          <div className="text-slate-500 italic h-full flex items-center justify-center">
                            Press "Send Request" to trace NestJS middleware and database transactional logs.
                          </div>
                        ) : (
                          consoleLogs.map((log, index) => {
                            let textClass = 'text-slate-300';
                            if (log.startsWith('[HTTP CLIENT]')) textClass = 'text-green-400';
                            else if (log.startsWith('[NEST.JS')) textClass = 'text-blue-400';
                            else if (log.startsWith('[AUTH')) textClass = 'text-indigo-400';
                            else if (log.startsWith('[TYPEORM')) textClass = 'text-yellow-400';
                            else if (log.startsWith('[MYSQL')) textClass = 'text-purple-400';
                            else if (log.startsWith('[HTTP GATEWAY')) textClass = 'text-green-500';
                            else if (log.includes('SELECT') || log.includes('INSERT') || log.includes('TRANSACTION')) textClass = 'text-pink-400 font-semibold';

                            return (
                              <div key={index} className={`leading-relaxed whitespace-pre-wrap ${textClass}`}>
                                {log}
                              </div>
                            );
                          })
                        )}
                        {isRunning && (
                          <div className="flex items-center gap-1.5 text-slate-500 animate-pulse mt-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-500 inline-block animate-bounce"></span>
                            <span>Awaiting server return...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* API response representation */}
                    <AnimatePresence>
                      {apiResponse && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5"
                        >
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Response Payload (200 OK)</label>
                          <div className="rounded-xl border border-green-500/20 bg-[#070b14] p-4 shadow-lg shadow-green-500/5">
                            <pre className="font-mono text-xs text-green-400 overflow-x-auto whitespace-pre">
                              {apiResponse}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.div>
              )}

              {/* Database Schema Map (dbdiagram) Mode */}
              {activeMode === 'db' && (
                <motion.div
                  key="db-mode"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  {/* Left Column: Tables selection */}
                  <div className="lg:col-span-4 space-y-2">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-2">My Relational Schema</h4>
                    <div className="space-y-1.5">
                      {Object.keys(dbSchema).map((tableName) => {
                        const isSelected = selectedTable === tableName;
                        return (
                          <button
                            key={tableName}
                            onClick={() => setSelectedTable(tableName)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-mono flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-slate-900 border-purple-500 text-white'
                                : 'bg-[#090d16] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Table className={`h-4 w-4 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                              <span>{tableName}</span>
                            </div>
                            <span className="text-[10px] text-slate-500">
                              {(dbSchema as any)[tableName].columns.length} cols
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="bg-[#0c1221] border border-slate-800 rounded-xl p-4 mt-4 text-xs">
                      <div className="flex items-center gap-1.5 text-purple-400 font-semibold mb-1">
                        <Database className="h-4 w-4" />
                        <span>TypeORM Entity Mapping</span>
                      </div>
                      <p className="text-slate-400 font-light leading-relaxed">
                        These physical MySQL tables align directly to TypeORM `@Entity()` declarations in Zain's codebase, enforcing strict data normalization and relational constraints.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Selected table column list inspector */}
                  <div className="lg:col-span-8">
                    <div className="rounded-xl border border-slate-800 bg-[#070b14] overflow-hidden shadow-inner flex flex-col h-full">
                      
                      {/* Header with Table Header */}
                      <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Table className="h-4 w-4 text-purple-400" />
                          <span className="font-mono text-sm text-white font-semibold">TABLE: {selectedTable}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">TypeORM Entity Structure</span>
                      </div>

                      {/* Column Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-500">
                              <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-wider">Column</th>
                              <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-wider">Type</th>
                              <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-wider text-center">Key</th>
                              <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-wider">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {(dbSchema as any)[selectedTable].columns.map((column: any) => (
                              <tr key={column.name} className="hover:bg-slate-900/30 text-slate-300">
                                <td className="py-3.5 px-4 font-semibold text-slate-200">{column.name}</td>
                                <td className="py-3.5 px-4 text-slate-400 font-medium">{column.type}</td>
                                <td className="py-3.5 px-4 text-center">
                                  {column.key ? (
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                      column.key === 'PK'
                                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    }`}>
                                      {column.key}
                                    </span>
                                  ) : (
                                    <span className="text-slate-600">-</span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 text-slate-400 font-light">{column.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Foreign Key Relations details */}
                      <div className="mt-auto bg-slate-950 p-4 border-t border-slate-800/60">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-2">
                          <Workflow className="h-4 w-4 text-purple-400" />
                          <span>Linked Relations & Constraints:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(dbSchema as any)[selectedTable].relations.map((rel: string, idx: number) => (
                            <span key={idx} className="px-2.5 py-1 rounded bg-[#0c1221] border border-slate-800 text-[10px] text-purple-300">
                              {rel}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
