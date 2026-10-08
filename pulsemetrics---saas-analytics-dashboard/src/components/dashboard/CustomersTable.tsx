import React, { useState, useMemo } from 'react';
import { CustomerItem, PlanType, CustomerStatus } from '../../types/analytics';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  UserX
} from 'lucide-react';

interface CustomersTableProps {
  customers: CustomerItem[];
  onSelectCustomer: (customer: CustomerItem) => void;
  onExportCsv: (items: CustomerItem[]) => void;
}

export const CustomersTable: React.FC<CustomersTableProps> = ({
  customers,
  onSelectCustomer,
  onExportCsv,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<'All' | PlanType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | CustomerStatus>('All');
  const [sortField, setSortField] = useState<'mrr' | 'healthScore' | 'name' | 'company'>('mrr');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const pageSize = 8;

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    return customers
      .filter((c) => {
        const matchesSearch =
          c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPlan = planFilter === 'All' || c.plan === planFilter;
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesPlan && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') {
          return sortOrder === 'asc'
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }
        return sortOrder === 'asc'
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
  }, [customers, searchQuery, planFilter, statusFilter, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / pageSize) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, currentPage]);

  const handleSort = (field: 'mrr' | 'healthScore' | 'name' | 'company') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedCustomers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedCustomers.map((c) => c.id)));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleExportSelected = () => {
    const toExport =
      selectedIds.size > 0
        ? customers.filter((c) => selectedIds.has(c.id))
        : filteredCustomers;
    onExportCsv(toExport);
  };

  const getStatusBadge = (status: CustomerStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active
          </span>
        );
      case 'trial':
        return (
          <span className="flex items-center gap-1.5 text-xs text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Trial
          </span>
        );
      case 'at_risk':
        return (
          <span className="flex items-center gap-1.5 text-xs text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            At Risk
          </span>
        );
      case 'churned':
        return (
          <span className="flex items-center gap-1.5 text-xs text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Churned
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 sm:p-6 flex flex-col justify-between">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Customer Accounts & Health
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {filteredCustomers.length} organizations
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time seat allocation, MRR contribution, and engagement health scores
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search accounts or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Starter">Starter</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="at_risk">At Risk</option>
            <option value="churned">Churned</option>
          </select>

          {/* Export Button */}
          <button
            onClick={handleExportSelected}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedIds.size > 0 ? `Export (${selectedIds.size})` : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* High Density Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 text-slate-400 font-mono text-[11px]">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={
                    paginatedCustomers.length > 0 &&
                    selectedIds.size === paginatedCustomers.length
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0 cursor-pointer"
                />
              </th>
              <th
                onClick={() => handleSort('company')}
                className="py-2.5 px-3 font-medium cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Organization</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-2.5 px-3 font-medium">Plan Tier</th>
              <th className="py-2.5 px-3 font-medium">Status</th>
              <th
                onClick={() => handleSort('mrr')}
                className="py-2.5 px-3 font-medium text-right cursor-pointer hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>MRR</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('healthScore')}
                className="py-2.5 px-3 font-medium text-right cursor-pointer hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Health</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-2.5 px-3 font-medium text-right">Seats Used</th>
              <th className="py-2.5 px-3 font-medium text-right">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginatedCustomers.map((cust) => {
              const isSelected = selectedIds.has(cust.id);
              return (
                <tr
                  key={cust.id}
                  onClick={() => onSelectCustomer(cust)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-950/20' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <td className="py-3 px-3" onClick={(e) => toggleSelectOne(cust.id, e)}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[11px] font-semibold text-indigo-300 shrink-0">
                        {cust.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <span className="font-semibold text-slate-100 block truncate hover:text-indigo-400">
                          {cust.company}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {cust.name} · {cust.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        cust.plan === 'Enterprise'
                          ? 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300'
                          : cust.plan === 'Pro'
                          ? 'border-sky-500/40 bg-sky-950/40 text-sky-300'
                          : 'border-slate-700 bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      {cust.plan}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {getStatusBadge(cust.status)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-100 font-semibold">
                    ${cust.mrr.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            cust.healthScore >= 80
                              ? 'bg-emerald-400'
                              : cust.healthScore >= 60
                              ? 'bg-amber-400'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${cust.healthScore}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums text-[11px] text-slate-300 w-6 text-right">
                        {cust.healthScore}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[11px] text-slate-400 tabular-nums">
                    {cust.seatsUsed} / {cust.totalSeats}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-400 text-[11px] font-mono whitespace-nowrap">
                    {cust.lastActive}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination & Summary Bar */}
      <div className="pt-4 border-t border-slate-800/60 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          Showing{' '}
          <span className="font-mono text-slate-200">
            {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, filteredCustomers.length)}
          </span>{' '}
          of <span className="font-mono text-slate-200">{filteredCustomers.length}</span> accounts
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-colors ${
                currentPage === pg
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
