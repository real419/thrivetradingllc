import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Building2, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Copy
} from 'lucide-react';

const PAYMENT_METHODS = [
  {
    id: 'crypto_usdt',
    name: 'USDT (TRC-20)',
    type: 'crypto',
    address: 'T9yD14Nj9j7x8Pq1R2s3T4u5V6w7X8y9Z0',
    minDeposit: 100,
    processingTime: 'Instant - 15 mins',
    instructions: 'Send exact amount using the TRC-20 network. Submissions require transaction hash verification.'
  },
  {
    id: 'crypto_btc',
    name: 'Bitcoin (BTC)',
    type: 'crypto',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    minDeposit: 250,
    processingTime: '1 - 3 Network Confirmations',
    instructions: 'Send only BTC to this wallet address. Deposits below minimum threshold cannot be processed.'
  },
  {
    id: 'bank_wire',
    name: 'International Bank Wire',
    type: 'bank',
    bankName: 'JPMorgan Chase Bank, N.A.',
    accountName: 'Thrivetradingllc Treasury Account',
    accountNumber: '883920192841',
    swiftCode: 'CHASUS33XXX',
    routingNumber: '021000021',
    minDeposit: 1000,
    processingTime: '1 - 3 Business Days',
    instructions: 'Include your Client User ID in the wire transfer reference memo.'
  }
];

export default function Deposits() {
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' | 'withdraw' | 'history'
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
  const [copied, setCopied] = useState(false);
  
  // Form States
  const [depositAmount, setDepositAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [depositSubmitted, setDepositSubmitted] = useState(false);

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('crypto_usdt');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [withdrawSubmitted, setWithdrawSubmitted] = useState(false);

  // Mock Transactions Data
  const mockTransactions = [
    { id: 'TX-90218', type: 'Deposit', amount: '$2,500.00', method: 'USDT (TRC-20)', status: 'Approved', date: '2026-09-10' },
    { id: 'TX-88310', type: 'Withdrawal', amount: '$750.00', method: 'Bitcoin (BTC)', status: 'Pending', date: '2026-09-11' },
    { id: 'TX-72109', type: 'Deposit', amount: '$10,000.00', method: 'Bank Wire', status: 'Approved', date: '2026-08-28' },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    setDepositSubmitted(true);
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    setWithdrawSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-6 md:space-y-8">
      
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 md:bg-white p-6 rounded-2xl border border-slate-800 md:border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-slate-900">Capital Management</h1>
          <p className="text-slate-400 md:text-slate-500 text-sm mt-1">Manage trading deposits, request funds withdrawal, and track settlement status.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800 md:bg-slate-50 p-3 rounded-xl border border-slate-700 md:border-slate-200">
          <div>
            <p className="text-xs uppercase font-semibold text-slate-400">Available Balance</p>
            <p className="text-xl font-extrabold text-white md:text-slate-900">$14,250.00</p>
          </div>
          <div className="h-8 w-px bg-slate-700 md:bg-slate-200" />
          <div>
            <p className="text-xs uppercase font-semibold text-slate-400">Pending Funds</p>
            <p className="text-xl font-bold text-amber-400 md:text-amber-600">$750.00</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Scrollable on mobile) */}
      <div className="flex border-b border-slate-800 md:border-slate-200 space-x-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`pb-4 text-sm font-semibold flex items-center space-x-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'deposit'
              ? 'border-cyan-400 text-cyan-400 md:border-blue-600 md:text-blue-600'
              : 'border-transparent text-slate-400 hover:text-slate-200 md:text-slate-500 md:hover:text-slate-800'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>Deposit Funds</span>
        </button>

        <button
          onClick={() => setActiveTab('withdraw')}
          className={`pb-4 text-sm font-semibold flex items-center space-x-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'withdraw'
              ? 'border-cyan-400 text-cyan-400 md:border-blue-600 md:text-blue-600'
              : 'border-transparent text-slate-400 hover:text-slate-200 md:text-slate-500 md:hover:text-slate-800'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Withdraw Funds</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-4 text-sm font-semibold flex items-center space-x-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-cyan-400 text-cyan-400 md:border-blue-600 md:text-blue-600'
              : 'border-transparent text-slate-400 hover:text-slate-200 md:text-slate-500 md:hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Transaction History</span>
        </button>
      </div>

      {/* TAB 1: DEPOSIT SECTION */}
      {activeTab === 'deposit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Method Selection Column */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 md:text-slate-500">Select Payment Gateway</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedMethod(method);
                    setDepositSubmitted(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between ${
                    selectedMethod.id === method.id
                      ? 'bg-slate-800 md:bg-blue-50/50 border-cyan-400 md:border-blue-600 shadow-sm'
                      : 'bg-slate-900 md:bg-white border-slate-800 md:border-slate-200 hover:border-slate-700 md:hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {method.type === 'crypto' ? (
                      <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                        <Wallet className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                        <Building2 className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-white md:text-slate-900">{method.name}</p>
                      <p className="text-xs text-slate-400">Min deposit: ${method.minDeposit}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{method.processingTime}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form & Instructions Column */}
          <div className="lg:col-span-2">
            {depositSubmitted ? (
              <div className="bg-slate-900 md:bg-white p-8 rounded-2xl border border-slate-800 md:border-slate-200 shadow-sm text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white md:text-slate-900">Deposit Notice Submitted</h3>
                <p className="text-slate-400 md:text-slate-500 text-sm max-w-md mx-auto">
                  Your deposit proof of ${depositAmount} via {selectedMethod.name} has been submitted for audit. Funds will reflect in your account upon network confirmation.
                </p>
                <button
                  onClick={() => {
                    setDepositSubmitted(false);
                    setDepositAmount('');
                    setTxHash('');
                  }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 md:bg-slate-100 md:hover:bg-slate-200 text-white md:text-slate-800 text-sm font-semibold rounded-lg transition"
                >
                  Submit Another Deposit
                </button>
              </div>
            ) : (
              <div className="bg-slate-900 md:bg-white p-6 md:p-8 rounded-2xl border border-slate-800 md:border-slate-200 shadow-sm space-y-6">
                
                {/* Selected Method Details */}
                <div className="border-b border-slate-800 md:border-slate-100 pb-6 space-y-4">
                  <h3 className="text-base font-bold text-white md:text-slate-900">
                    Payment Instructions - {selectedMethod.name}
                  </h3>
                  <p className="text-xs text-slate-400 md:text-slate-500 leading-relaxed">{selectedMethod.instructions}</p>

                  {selectedMethod.type === 'crypto' ? (
                    <div className="bg-slate-800 md:bg-slate-50 p-4 rounded-xl border border-slate-700 md:border-slate-200 space-y-3">
                      <p className="text-xs font-semibold uppercase text-slate-400">Deposit Wallet Address</p>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-slate-900 md:bg-white p-3 rounded-lg border border-slate-700 md:border-slate-200 gap-2">
                        <span className="text-xs font-mono font-semibold text-slate-200 md:text-slate-800 break-all">{selectedMethod.address}</span>
                        <button
                          onClick={() => handleCopy(selectedMethod.address)}
                          className="px-3 py-2 sm:py-1 bg-slate-800 hover:bg-slate-700 md:bg-slate-100 md:hover:bg-slate-200 text-slate-200 md:text-slate-700 text-xs font-semibold rounded transition shrink-0 flex items-center justify-center space-x-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-800 md:bg-slate-50 p-4 rounded-xl border border-slate-700 md:border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">Bank Name</span>
                        <span className="font-bold text-white md:text-slate-900">{selectedMethod.bankName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">Account Name</span>
                        <span className="font-bold text-white md:text-slate-900">{selectedMethod.accountName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">Account Number</span>
                        <span className="font-mono font-bold text-white md:text-slate-900">{selectedMethod.accountNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">SWIFT / BIC</span>
                        <span className="font-mono font-bold text-white md:text-slate-900">{selectedMethod.swiftCode}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submission Form */}
                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Submit Deposit Proof</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 md:text-slate-500 mb-1">Deposit Amount (USD)</label>
                      <input
                        type="number"
                        min={selectedMethod.minDeposit}
                        required
                        placeholder={`Min $${selectedMethod.minDeposit}`}
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="w-full bg-slate-800 md:bg-slate-50 border border-slate-700 md:border-slate-200 rounded-lg px-4 py-2.5 text-sm text-white md:text-slate-900 focus:outline-none focus:border-cyan-400 md:focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 md:text-slate-500 mb-1">
                        {selectedMethod.type === 'crypto' ? 'Transaction Hash / TXID' : 'Wire Reference Number'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter transaction identifier"
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        className="w-full bg-slate-800 md:bg-slate-50 border border-slate-700 md:border-slate-200 rounded-lg px-4 py-2.5 text-sm text-white md:text-slate-900 focus:outline-none focus:border-cyan-400 md:focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 md:text-slate-500 mb-1">Upload Receipt Proof (Optional)</label>
                    <div className="border-2 border-dashed border-slate-700 md:border-slate-200 rounded-xl p-4 text-center bg-slate-800/50 md:bg-slate-50 hover:bg-slate-800 transition cursor-pointer relative">
                      <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-400 md:text-slate-500">Drag & drop or click to upload receipt image (PNG, JPG, PDF)</p>
                      <input
                        type="file"
                        onChange={(e) => setProofFile(e.target.files[0])}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="proof-upload"
                      />
                    </div>
                    {proofFile && <p className="text-xs text-cyan-400 mt-1">Selected: {proofFile.name}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 md:bg-blue-600 md:hover:bg-blue-500 text-slate-950 md:text-white font-bold rounded-lg text-sm transition shadow-md"
                  >
                    Confirm & Submit Deposit
                  </button>
                </form>

              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: WITHDRAWAL SECTION */}
      {activeTab === 'withdraw' && (
        <div className="max-w-2xl mx-auto">
          {withdrawSubmitted ? (
            <div className="bg-slate-900 md:bg-white p-8 rounded-2xl border border-slate-800 md:border-slate-200 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white md:text-slate-900">Withdrawal Request Received</h3>
              <p className="text-slate-400 md:text-slate-500 text-sm max-w-md mx-auto">
                Your request to withdraw ${withdrawAmount} to destination {destinationAddress} has been logged. Processing typically takes 1 to 24 hours.
              </p>
              <button
                onClick={() => {
                  setWithdrawSubmitted(false);
                  setWithdrawAmount('');
                  setDestinationAddress('');
                }}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 md:bg-slate-100 md:hover:bg-slate-200 text-white md:text-slate-800 text-sm font-semibold rounded-lg transition"
              >
                New Withdrawal Request
              </button>
            </div>
          ) : (
            <div className="bg-slate-900 md:bg-white p-6 md:p-8 rounded-2xl border border-slate-800 md:border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-800 md:border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-white md:text-slate-900">Request Withdrawal</h3>
                <p className="text-xs text-slate-400 md:text-slate-500 mt-1">Withdrawals are processed during standard market settlement hours.</p>
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 md:text-slate-500 mb-1">Payout Channel</label>
                  <select
                    value={withdrawMethod}
                    onChange={(e) => setWithdrawMethod(e.target.value)}
                    className="w-full bg-slate-800 md:bg-slate-50 border border-slate-700 md:border-slate-200 rounded-lg px-4 py-2.5 text-sm text-white md:text-slate-900 focus:outline-none focus:border-cyan-400 md:focus:border-blue-600"
                  >
                    <option value="crypto_usdt">USDT TRC-20 Wallet</option>
                    <option value="crypto_btc">Bitcoin Address</option>
                    <option value="bank_wire">Bank Wire Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 md:text-slate-500 mb-1">Amount to Withdraw (USD)</label>
                  <input
                    type="number"
                    required
                    max={14250}
                    placeholder="Enter amount (Available: $14,250.00)"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-slate-800 md:bg-slate-50 border border-slate-700 md:border-slate-200 rounded-lg px-4 py-2.5 text-sm text-white md:text-slate-900 focus:outline-none focus:border-cyan-400 md:focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 md:text-slate-500 mb-1">Destination Address / IBAN</label>
                  <input
                    type="text"
                    required
                    placeholder="Provide receiving wallet address or account details"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    className="w-full bg-slate-800 md:bg-slate-50 border border-slate-700 md:border-slate-200 rounded-lg px-4 py-2.5 text-sm text-white md:text-slate-900 focus:outline-none focus:border-cyan-400 md:focus:border-blue-600 font-mono text-xs"
                  />
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start space-x-2 text-xs text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Please verify destination details carefully. Transactions sent to incorrect addresses cannot be reversed.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 md:bg-blue-600 md:hover:bg-blue-500 text-slate-950 md:text-white font-bold rounded-lg text-sm transition shadow-md"
                >
                  Submit Withdrawal Request
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TRANSACTION HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-slate-900 md:bg-white rounded-2xl border border-slate-800 md:border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-800 md:border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-white md:text-navy-900">Ledger History</h3>
            <span className="text-xs text-slate-400">Showing last 3 transactions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-800/50 md:bg-slate-50 border-b border-slate-800 md:border-slate-200 text-xs font-semibold uppercase text-slate-400">
                  <th className="p-4">Reference ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 md:divide-slate-100 text-sm">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30 md:hover:bg-slate-50/50 transition">
                    <td className="p-4 font-mono text-xs font-bold text-slate-300 md:text-slate-700">{tx.id}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1 font-semibold text-xs ${
                        tx.type === 'Deposit' ? 'text-emerald-400 md:text-emerald-600' : 'text-amber-400 md:text-amber-600'
                      }`}>
                        {tx.type === 'Deposit' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                        <span>{tx.type}</span>
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 md:text-slate-600 text-xs font-medium">{tx.method}</td>
                    <td className="p-4 font-bold text-white md:text-slate-900">{tx.amount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'Approved' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 md:bg-emerald-50 md:text-emerald-700 md:border-emerald-200' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 md:bg-amber-50 md:text-amber-700 md:border-amber-200'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}