import React, { useState, useEffect } from 'react';
import { Battery, Sun, Home, TrendingDown, Zap, DollarSign, Users, AlertCircle, Settings } from 'lucide-react';

export default function EnergiaComumSimulator() {
  const [userProfile, setUserProfile] = useState('hybrid');
  const [currentTime, setCurrentTime] = useState(12);
  const [solarGeneration, setSolarGeneration] = useState(4.2);
  const [consumption, setConsumption] = useState(2.8);
  const [batteryLevel, setBatteryLevel] = useState(65);
  const [balance, setBalance] = useState(145.80);
  const [totalSaved, setTotalSaved] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([
    { id: 1, type: 'venda', amount: 5, price: 0.45, time: '14:00-16:00', status: 'ativa' },
    { id: 2, type: 'compra', amount: 3, price: 0.38, time: '18:00-20:00', status: 'pendente' }
  ]);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'venda', amount: 3.2, price: 0.42, buyer: 'Casa #47', time: '11:30', value: 1.34 },
    { id: 2, type: 'compra', amount: 2.5, price: 0.39, seller: 'Casa #23', time: '09:15', value: -0.98 }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', msg: 'Venda concluída: 3.2 kWh por R$ 1.34' },
    { id: 2, type: 'info', msg: 'Preço baixo detectado: hora de comprar!' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => (prev + 1) % 24);
      
      const hour = currentTime;
      const solarCurve = hour >= 6 && hour <= 18 
        ? Math.max(0, 5 * Math.sin((hour - 6) * Math.PI / 12)) 
        : 0;
      setSolarGeneration(Number(solarCurve.toFixed(1)));
      
      const consumptionPattern = hour >= 18 && hour <= 22 ? 4.5 : hour >= 6 && hour <= 8 ? 3.2 : 1.8;
      setConsumption(Number((consumptionPattern + (Math.random() - 0.5) * 0.5).toFixed(1)));
      
      const netEnergy = solarCurve - consumptionPattern;
      if (netEnergy > 0 && batteryLevel < 100) {
        setBatteryLevel(prev => Math.min(100, prev + 2));
      } else if (netEnergy < 0 && batteryLevel > 10) {
        setBatteryLevel(prev => Math.max(10, prev - 1.5));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentTime, batteryLevel]);

  const energyBalance = solarGeneration - consumption;
  const currentPrice = currentTime >= 18 && currentTime <= 21 ? 0.52 : 0.38;

  const handleCreateOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      type: energyBalance > 0 ? 'venda' : 'compra',
      amount: Math.abs(energyBalance).toFixed(1),
      price: currentPrice,
      time: `${currentTime}:00-${currentTime + 2}:00`,
      status: 'ativa'
    };
    setOrders([...orders, newOrder]);
    setNotifications([{ id: Date.now(), type: 'success', msg: `Ordem de ${newOrder.type} criada com sucesso!` }, ...notifications.slice(0, 2)]);
  };

  const communityStats = {
    totalGeneration: 287.5,
    totalConsumption: 245.8,
    activeUsers: 156,
    renewablePercent: 78
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">EnergiaComum</h1>
                <p className="text-gray-500">Mercado P2P de Energia</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Saldo Atual</p>
              <p className="text-3xl font-bold text-green-600">R$ {balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-4 space-y-2">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-3 rounded-lg flex items-center gap-2 ${notif.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{notif.msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-2 flex gap-2">
          {['dashboard', 'mercado', 'historico'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'dashboard' ? 'Painel' : tab === 'mercado' ? 'Mercado P2P' : 'Histórico'}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Sun className="w-10 h-10" />
                  <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {currentTime}:00h
                  </span>
                </div>
                <p className="text-sm opacity-90 mb-1">Geração Solar</p>
                <p className="text-4xl font-bold">{solarGeneration} kW</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Home className="w-10 h-10" />
                  <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Agora
                  </span>
                </div>
                <p className="text-sm opacity-90 mb-1">Consumo</p>
                <p className="text-4xl font-bold">{consumption} kW</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Battery className="w-10 h-10" />
                  <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {batteryLevel}%
                  </span>
                </div>
                <p className="text-sm opacity-90 mb-1">Bateria</p>
                <div className="relative w-full h-3 bg-white bg-opacity-30 rounded-full mt-3">
                  <div 
                    className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${batteryLevel}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Energy Balance */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Balanço Energético</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-2">Saldo Atual</p>
                  <p className={`text-5xl font-bold ${energyBalance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {energyBalance > 0 ? '+' : ''}{energyBalance.toFixed(1)} kW
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {energyBalance > 0 ? 'Excedente disponível para venda' : 'Déficit - comprando da comunidade'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 mb-2">Preço Atual P2P</p>
                  <p className="text-3xl font-bold text-blue-600">R$ {currentPrice}/kWh</p>
                  <button 
                    onClick={handleCreateOrder}
                    className="mt-4 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Criar Ordem
                  </button>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                Estatísticas da Comunidade
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{communityStats.totalGeneration} kW</p>
                  <p className="text-sm text-gray-600">Geração Total</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{communityStats.totalConsumption} kW</p>
                  <p className="text-sm text-gray-600">Consumo Total</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{communityStats.activeUsers}</p>
                  <p className="text-sm text-gray-600">Usuários Ativos</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600">{communityStats.renewablePercent}%</p>
                  <p className="text-sm text-gray-600">Energia Renovável</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mercado Tab */}
        {activeTab === 'mercado' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Minhas Ordens Ativas</h3>
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-full font-semibold ${
                          order.type === 'venda' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.type.toUpperCase()}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800">{order.amount} kWh</p>
                          <p className="text-sm text-gray-500">{order.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">R$ {order.price}</p>
                        <p className="text-sm text-gray-500">por kWh</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ofertas Disponíveis na Comunidade</h3>
              <div className="space-y-3">
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">Casa #23 - VENDA</p>
                      <p className="text-sm text-gray-600">8.5 kWh • Horário: 13:00-15:00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">R$ 0.40/kWh</p>
                      <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">Casa #67 - COMPRA</p>
                      <p className="text-sm text-gray-600">4.2 kWh • Horário: 19:00-21:00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">R$ 0.48/kWh</p>
                      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                        Vender
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Historico Tab */}
        {activeTab === 'historico' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Transações Recentes</h3>
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'venda' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <DollarSign className={`w-5 h-5 ${tx.type === 'venda' ? 'text-green-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {tx.type === 'venda' ? 'Venda para' : 'Compra de'} {tx.type === 'venda' ? tx.buyer : tx.seller}
                        </p>
                        <p className="text-sm text-gray-500">{tx.amount} kWh • R$ {tx.price}/kWh • {tx.time}</p>
                      </div>
                    </div>
                    <p className={`text-xl font-bold ${tx.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.value > 0 ? '+' : ''}R$ {Math.abs(tx.value).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg">
              <p className="text-sm text-gray-600">Economia Total do Mês</p>
              <p className="text-3xl font-bold text-green-700">R$ 48.60</p>
              <p className="text-sm text-gray-600 mt-1">vs. tarifa convencional (R$ 0.65/kWh)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}