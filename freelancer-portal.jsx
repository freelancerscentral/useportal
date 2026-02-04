import React, { useState } from 'react';
import { FileText, DollarSign, Upload, Clock, Check, ChevronRight, Menu, X, LogOut, Settings, Users } from 'lucide-react';

const FreelancerPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data
  const clients = [
    { 
      id: 1, 
      name: 'Acme Corp', 
      status: 'active',
      avatar: '🏢',
      projects: 3,
      revenue: 12500,
      lastActive: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'TechStart Inc', 
      status: 'active',
      avatar: '🚀',
      projects: 1,
      revenue: 8000,
      lastActive: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Design Studio', 
      status: 'pending',
      avatar: '🎨',
      projects: 2,
      revenue: 6500,
      lastActive: '3 days ago'
    },
  ];

  const invoices = [
    { id: 1, client: 'Acme Corp', amount: 2500, status: 'paid', date: '2026-01-28', dueDate: '2026-02-15' },
    { id: 2, client: 'TechStart Inc', amount: 4000, status: 'pending', date: '2026-01-30', dueDate: '2026-02-20' },
    { id: 3, client: 'Design Studio', amount: 1500, status: 'overdue', date: '2026-01-15', dueDate: '2026-02-01' },
  ];

  const contracts = [
    { id: 1, client: 'Acme Corp', title: 'Q1 Marketing Campaign', status: 'signed', date: '2026-01-15' },
    { id: 2, client: 'TechStart Inc', title: 'Website Redesign', status: 'pending', date: '2026-01-25' },
    { id: 3, client: 'Design Studio', title: 'Brand Guidelines', status: 'signed', date: '2026-01-20' },
  ];

  const files = [
    { id: 1, name: 'Brand_Assets.zip', client: 'Acme Corp', size: '24.5 MB', date: '2026-01-28' },
    { id: 2, name: 'Contract_Final.pdf', client: 'TechStart Inc', size: '1.2 MB', date: '2026-01-30' },
    { id: 3, name: 'Mockups_v3.fig', client: 'Design Studio', size: '8.7 MB', date: '2026-01-26' },
  ];

  const stats = {
    totalRevenue: 27000,
    activeClients: 2,
    pendingInvoices: 5500,
    completedProjects: 12
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      overdue: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      signed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    };
    return colors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const Sidebar = () => (
    <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800/50 transition-transform duration-300 ease-out`}>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-zinc-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight">Portal</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Freelancer Hub</p>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'clients', label: 'Clients', icon: '👥' },
            { id: 'invoices', label: 'Invoices', icon: '💰' },
            { id: 'contracts', label: 'Contracts', icon: '📝' },
            { id: 'files', label: 'Files', icon: '📁' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800/50">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200">
            <Settings size={18} />
            <span className="font-medium text-sm">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all duration-200 mt-1">
            <LogOut size={18} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'violet' },
          { label: 'Active Clients', value: stats.activeClients, icon: Users, color: 'fuchsia' },
          { label: 'Pending Invoices', value: `$${stats.pendingInvoices.toLocaleString()}`, icon: Clock, color: 'amber' },
          { label: 'Completed Projects', value: stats.completedProjects, icon: Check, color: 'emerald' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300 group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold mt-2 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-300 bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`text-${stat.color}-400`} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {invoices.slice(0, 3).map(invoice => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200">
                <div>
                  <p className="font-medium text-white text-sm">{invoice.client}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Due: {invoice.dueDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">${invoice.amount.toLocaleString()}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Clients</h3>
          <div className="space-y-3">
            {clients.filter(c => c.status === 'active').map(client => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{client.avatar}</div>
                  <div>
                    <p className="font-medium text-white text-sm">{client.name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{client.projects} active projects</p>
                  </div>
                </div>
                <ChevronRight className="text-zinc-600" size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ClientsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Clients</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-200">
          + Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map(client => (
          <div key={client.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:border-violet-500/30 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{client.avatar}</div>
                <div>
                  <h3 className="font-semibold text-white">{client.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Last active: {client.lastActive}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(client.status)}`}>
                {client.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
              <div>
                <p className="text-zinc-500 text-xs">Projects</p>
                <p className="text-white font-semibold mt-1">{client.projects}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Revenue</p>
                <p className="text-white font-semibold mt-1">${client.revenue.toLocaleString()}</p>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-zinc-800/50 text-zinc-300 rounded-lg font-medium text-sm hover:bg-zinc-800 transition-all duration-200 group-hover:bg-violet-500/10 group-hover:text-violet-400">
              View Portal
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const InvoicesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Invoices</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-200">
          + Create Invoice
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-800/30 border-b border-zinc-800/50">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Client</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Amount</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Due Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {invoices.map(invoice => (
              <tr key={invoice.id} className="hover:bg-zinc-800/20 transition-colors duration-150">
                <td className="px-6 py-4 text-sm font-medium text-white">{invoice.client}</td>
                <td className="px-6 py-4 text-sm font-semibold text-white">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-zinc-400">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-zinc-400">{invoice.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ContractsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contracts</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-200">
          + New Contract
        </button>
      </div>

      <div className="space-y-3">
        {contracts.map(contract => (
          <div key={contract.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:border-violet-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                  <FileText className="text-violet-400" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{contract.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{contract.client}</p>
                  <p className="text-xs text-zinc-600 mt-2">Created: {contract.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
                <button className="px-4 py-2 bg-zinc-800/50 text-zinc-300 rounded-lg font-medium text-sm hover:bg-zinc-800 transition-all duration-200">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FilesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Files</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-200 flex items-center gap-2">
          <Upload size={16} />
          Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map(file => (
          <div key={file.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:border-violet-500/30 transition-all duration-300 group cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="text-fuchsia-400" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-sm truncate">{file.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">{file.client}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-zinc-800/50">
                  <span className="text-xs text-zinc-600">{file.size}</span>
                  <span className="text-xs text-zinc-600">•</span>
                  <span className="text-xs text-zinc-600">{file.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #18181b;
        }

        ::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>

      <Sidebar />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-zinc-950 border-b border-zinc-800/50 px-4 py-3 z-40 flex items-center justify-between">
        <button onClick={() => setMobileMenuOpen(true)} className="text-zinc-400 hover:text-white">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Portal</h1>
        <div className="w-6" />
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64 min-h-screen">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8 animate-fade-in">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'clients' && <ClientsView />}
          {activeTab === 'invoices' && <InvoicesView />}
          {activeTab === 'contracts' && <ContractsView />}
          {activeTab === 'files' && <FilesView />}
        </div>
      </div>
    </div>
  );
};

export default FreelancerPortal;