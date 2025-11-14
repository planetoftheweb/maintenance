import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MaintenanceDashboard = () => {
  const [data, setData] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const csvData = `Date,Equipment,Task Performed,Technician,Scheduled,Completed On Time,Downtime Impact (hrs)
2024-03-22,Vacuum Chamber,Sensor Inspection,J. Lin,N,Y,0.0
2024-01-30,Laser Alignment System,Sensor Inspection,J. Lin,Y,Y,0.0
2024-02-11,X-ray Detector,Filter Replacement,S. Ito,Y,N,2.9
2024-03-19,Power Supply Unit,Lubrication,S. Ito,Y,Y,0.0
2024-03-18,Power Supply Unit,Cable Routing,J. Lin,Y,Y,0.0
2024-02-13,Optics Bench,Leak Test,T. Patel,Y,Y,0.0
2024-02-06,Sample Injector,Calibration,S. Ito,Y,N,2.3
2024-02-03,X-ray Detector,Valve Check,M. Chen,Y,N,2.1
2024-02-26,Power Supply Unit,Calibration,A. Gomez,Y,N,1.9
2024-03-10,Cryo Pump,Lubrication,K. Lopez,N,Y,0.0
2024-01-14,X-ray Detector,Cable Routing,A. Gomez,Y,Y,0.0
2024-02-23,X-ray Detector,Filter Replacement,R. Diaz,Y,Y,0.0
2024-03-01,Cooling System,Calibration,M. Chen,N,N,2.5
2024-01-14,Optics Bench,Cable Routing,S. Ito,Y,Y,0.0
2024-02-01,Cooling System,Valve Check,J. Lin,Y,N,0.6
2024-01-08,Cryo Pump,Firmware Update,J. Lin,Y,N,0.3
2024-02-02,Vacuum Chamber,Calibration,K. Lopez,Y,Y,0.0
2024-03-10,Sample Injector,Leak Test,S. Ito,N,N,2.2
2024-01-08,Motion Control Stage,Valve Check,J. Lin,Y,N,2.5
2024-02-27,Data Acquisition Rack,Filter Replacement,M. Chen,Y,N,2.4
2024-03-05,Cooling System,Cable Routing,K. Lopez,N,Y,0.0
2024-03-24,Optics Bench,Valve Check,A. Gomez,N,Y,0.0
2024-03-17,Cooling System,Valve Check,T. Patel,N,N,0.6
2024-03-11,Cryo Pump,Cooling Line Flush,T. Patel,Y,Y,0.0
2024-02-28,Optics Bench,Valve Check,A. Gomez,Y,Y,0.0
2024-03-10,X-ray Detector,Valve Check,M. Chen,N,N,0.6
2024-01-22,Data Acquisition Rack,Sensor Inspection,T. Patel,N,Y,0.0
2024-01-06,Sample Injector,Leak Test,K. Lopez,Y,Y,0.0
2024-01-27,Cryo Pump,Firmware Update,T. Patel,Y,Y,0.0
2024-02-27,Data Acquisition Rack,Cooling Line Flush,T. Patel,N,Y,0.0
2024-02-07,Optics Bench,Alignment Verification,K. Lopez,N,Y,0.0
2024-01-25,Cryo Pump,Leak Test,T. Patel,N,Y,0.0
2024-01-18,Motion Control Stage,Firmware Update,T. Patel,Y,N,0.7
2024-03-06,X-ray Detector,Leak Test,A. Gomez,N,Y,0.0
2024-02-17,Vacuum Chamber,Cooling Line Flush,J. Lin,N,Y,0.0
2024-02-29,Power Supply Unit,Alignment Verification,J. Lin,Y,Y,0.0
2024-01-09,Optics Bench,Leak Test,T. Patel,N,Y,0.0
2024-02-17,Cooling System,Firmware Update,J. Lin,Y,Y,0.0
2024-01-24,Data Acquisition Rack,Alignment Verification,A. Gomez,Y,Y,0.0
2024-01-02,Vacuum Chamber,Filter Replacement,M. Chen,Y,Y,0.0
2024-01-06,Data Acquisition Rack,Sensor Inspection,A. Gomez,N,Y,0.0
2024-01-28,Motion Control Stage,Calibration,R. Diaz,N,Y,0.0
2024-01-20,Motion Control Stage,Firmware Update,A. Gomez,N,Y,0.0
2024-02-16,Vacuum Chamber,Alignment Verification,T. Patel,N,Y,0.0
2024-01-22,Power Supply Unit,Lubrication,A. Gomez,N,Y,0.0
2024-02-17,Laser Alignment System,Lubrication,T. Patel,Y,N,2.5
2024-01-16,Laser Alignment System,Cooling Line Flush,J. Lin,Y,Y,0.0
2024-03-05,Optics Bench,Filter Replacement,J. Lin,Y,Y,0.0
2024-03-13,Sample Injector,Filter Replacement,A. Gomez,Y,Y,0.0
2024-02-29,Sample Injector,Lubrication,M. Chen,Y,Y,0.0
2024-03-16,Cryo Pump,Cable Routing,T. Patel,Y,N,2.3
2024-01-10,Vacuum Chamber,Leak Test,R. Diaz,N,N,0.2
2024-01-25,Optics Bench,Calibration,J. Lin,N,Y,0.0
2024-01-02,X-ray Detector,Calibration,T. Patel,Y,Y,0.0
2024-02-24,Motion Control Stage,Calibration,M. Chen,Y,Y,0.0
2024-01-24,Motion Control Stage,Filter Replacement,M. Chen,N,Y,0.0
2024-03-18,Power Supply Unit,Leak Test,R. Diaz,N,Y,0.0
2024-01-31,Motion Control Stage,Filter Replacement,J. Lin,Y,Y,0.0
2024-02-17,X-ray Detector,Lubrication,K. Lopez,Y,Y,0.0
2024-01-02,Cooling System,Alignment Verification,S. Ito,Y,Y,0.0
2024-02-21,Cryo Pump,Cable Routing,S. Ito,N,Y,0.0
2024-01-20,Motion Control Stage,Filter Replacement,T. Patel,Y,Y,0.0
2024-03-02,Sample Injector,Cooling Line Flush,M. Chen,N,Y,0.0
2024-02-21,Cooling System,Leak Test,M. Chen,Y,Y,0.0
2024-02-02,Cryo Pump,Cable Routing,S. Ito,N,Y,0.0
2024-03-17,Laser Alignment System,Filter Replacement,T. Patel,Y,N,0.8
2024-03-06,Cryo Pump,Calibration,M. Chen,Y,N,1.5
2024-03-12,Cooling System,Leak Test,M. Chen,Y,Y,0.0
2024-01-09,X-ray Detector,Calibration,S. Ito,Y,Y,0.0
2024-03-05,X-ray Detector,Calibration,K. Lopez,Y,Y,0.0
2024-03-04,Optics Bench,Valve Check,A. Gomez,N,Y,0.0
2024-01-26,X-ray Detector,Leak Test,R. Diaz,N,N,0.9
2024-01-14,Cooling System,Firmware Update,R. Diaz,N,Y,0.0
2024-02-26,Vacuum Chamber,Valve Check,T. Patel,N,Y,0.0
2024-01-17,Sample Injector,Sensor Inspection,M. Chen,Y,Y,0.0
2024-01-30,Laser Alignment System,Sensor Inspection,A. Gomez,N,Y,0.0
2024-02-29,Sample Injector,Alignment Verification,S. Ito,Y,Y,0.0
2024-02-15,Vacuum Chamber,Sensor Inspection,K. Lopez,Y,Y,0.0
2024-01-06,Motion Control Stage,Sensor Inspection,K. Lopez,N,Y,0.0
2024-01-29,Motion Control Stage,Calibration,R. Diaz,N,Y,0.0
2024-03-23,Optics Bench,Lubrication,M. Chen,N,Y,0.0
2024-02-14,Cryo Pump,Leak Test,M. Chen,N,Y,0.0
2024-01-30,Optics Bench,Firmware Update,M. Chen,Y,Y,0.0
2024-03-14,Sample Injector,Alignment Verification,A. Gomez,Y,N,0.3
2024-03-13,Cooling System,Firmware Update,M. Chen,Y,Y,0.0
2024-03-17,X-ray Detector,Alignment Verification,A. Gomez,N,Y,0.0
2024-01-23,Data Acquisition Rack,Cable Routing,J. Lin,N,Y,0.0
2024-01-16,Cooling System,Filter Replacement,S. Ito,Y,Y,0.0
2024-02-18,Sample Injector,Filter Replacement,J. Lin,Y,N,1.3
2024-02-22,Data Acquisition Rack,Valve Check,K. Lopez,Y,Y,0.0
2024-01-12,Cryo Pump,Sensor Inspection,A. Gomez,N,Y,0.0
2024-01-22,Cryo Pump,Calibration,K. Lopez,N,Y,0.0
2024-01-05,X-ray Detector,Filter Replacement,S. Ito,Y,N,3.0
2024-02-10,Cooling System,Sensor Inspection,K. Lopez,Y,N,1.2
2024-02-15,Sample Injector,Valve Check,A. Gomez,Y,Y,0.0
2024-03-07,Optics Bench,Lubrication,M. Chen,N,Y,0.0
2024-03-24,Power Supply Unit,Cooling Line Flush,T. Patel,N,Y,0.0
2024-01-25,Data Acquisition Rack,Firmware Update,K. Lopez,Y,Y,0.0
2024-01-25,Cryo Pump,Firmware Update,R. Diaz,N,Y,0.0
2024-01-24,Cryo Pump,Cooling Line Flush,A. Gomez,Y,Y,0.0
2024-02-08,Power Supply Unit,Valve Check,J. Lin,N,Y,0.0
2024-03-24,Vacuum Chamber,Lubrication,K. Lopez,Y,Y,0.0
2024-03-21,Optics Bench,Firmware Update,S. Ito,Y,Y,0.0
2024-01-14,Motion Control Stage,Calibration,S. Ito,N,N,1.4
2024-03-20,Vacuum Chamber,Calibration,J. Lin,Y,N,2.7
2024-01-09,Data Acquisition Rack,Leak Test,J. Lin,N,Y,0.0
2024-02-20,Optics Bench,Valve Check,K. Lopez,N,Y,0.0
2024-02-11,Motion Control Stage,Sensor Inspection,R. Diaz,Y,Y,0.0
2024-02-09,Sample Injector,Cooling Line Flush,T. Patel,N,Y,0.0
2024-02-25,Sample Injector,Calibration,T. Patel,N,Y,0.0
2024-02-20,Laser Alignment System,Leak Test,R. Diaz,Y,N,0.8
2024-02-01,Optics Bench,Leak Test,A. Gomez,Y,Y,0.0
2024-02-10,Cooling System,Leak Test,M. Chen,N,Y,0.0
2024-02-06,Cooling System,Firmware Update,A. Gomez,Y,Y,0.0
2024-03-18,Power Supply Unit,Alignment Verification,R. Diaz,Y,Y,0.0
2024-02-24,Power Supply Unit,Leak Test,M. Chen,Y,Y,0.0
2024-02-06,Power Supply Unit,Cable Routing,S. Ito,N,N,0.3
2024-02-14,Laser Alignment System,Valve Check,M. Chen,Y,Y,0.0
2024-02-26,Cooling System,Cooling Line Flush,J. Lin,N,Y,0.0
2024-02-29,Data Acquisition Rack,Cable Routing,T. Patel,N,Y,0.0`;

  useEffect(() => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const parsed = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        date: values[0],
        equipment: values[1],
        task: values[2],
        technician: values[3],
        scheduled: values[4] === 'Y',
        completedOnTime: values[5] === 'Y',
        downtime: parseFloat(values[6])
      };
    });
    setData(parsed);
  }, []);

  const askAI = async () => {
    if (!userQuery.trim()) return;
    
    setAiLoading(true);
    try {
      const context = JSON.stringify({
        totalRecords: data.length,
        equipmentTypes: [...new Set(data.map(d => d.equipment))],
        technicians: [...new Set(data.map(d => d.technician))],
        taskTypes: [...new Set(data.map(d => d.task))],
        totalDowntime: data.reduce((sum, d) => sum + d.downtime, 0),
        sampleData: data.slice(0, 10)
      }, null, 2);

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{
            role: "user",
            content: `You are analyzing preventive maintenance data for LCLS equipment. Here is the data context:\n\n${context}\n\nUser question: ${userQuery}\n\nProvide a clear, actionable answer based on this maintenance data.`
          }]
        })
      });

      const result = await response.json();
      setAiResponse(result.content[0].text);
    } catch (error) {
      setAiResponse("Error connecting to AI. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const calculateStats = () => {
    const totalTasks = data.length;
    const scheduledTasks = data.filter(d => d.scheduled).length;
    const completedOnTime = data.filter(d => d.completedOnTime).length;
    const totalDowntime = data.reduce((sum, d) => sum + d.downtime, 0);
    const tasksWithDowntime = data.filter(d => d.downtime > 0).length;

    return {
      totalTasks,
      scheduledTasks,
      scheduledRate: ((scheduledTasks / totalTasks) * 100).toFixed(1),
      completedOnTime,
      onTimeRate: ((completedOnTime / totalTasks) * 100).toFixed(1),
      totalDowntime: totalDowntime.toFixed(1),
      avgDowntime: (totalDowntime / tasksWithDowntime).toFixed(2),
      tasksWithDowntime
    };
  };

  const getEquipmentStats = () => {
    const equipmentMap = {};
    data.forEach(d => {
      if (!equipmentMap[d.equipment]) {
        equipmentMap[d.equipment] = {
          equipment: d.equipment,
          total: 0,
          onTime: 0,
          downtime: 0
        };
      }
      equipmentMap[d.equipment].total += 1;
      if (d.completedOnTime) equipmentMap[d.equipment].onTime += 1;
      equipmentMap[d.equipment].downtime += d.downtime;
    });

    return Object.values(equipmentMap)
      .map(e => ({
        ...e,
        onTimeRate: ((e.onTime / e.total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.total - a.total);
  };

  const getTechnicianStats = () => {
    const techMap = {};
    data.forEach(d => {
      if (!techMap[d.technician]) {
        techMap[d.technician] = {
          technician: d.technician,
          total: 0,
          onTime: 0,
          downtime: 0
        };
      }
      techMap[d.technician].total += 1;
      if (d.completedOnTime) techMap[d.technician].onTime += 1;
      techMap[d.technician].downtime += d.downtime;
    });

    return Object.values(techMap)
      .map(t => ({
        ...t,
        onTimeRate: parseFloat(((t.onTime / t.total) * 100).toFixed(1))
      }))
      .sort((a, b) => b.total - a.total);
  };

  const getTaskStats = () => {
    const taskMap = {};
    data.forEach(d => {
      if (!taskMap[d.task]) {
        taskMap[d.task] = {
          task: d.task,
          count: 0,
          avgDowntime: 0,
          totalDowntime: 0
        };
      }
      taskMap[d.task].count += 1;
      taskMap[d.task].totalDowntime += d.downtime;
    });

    return Object.values(taskMap)
      .map(t => ({
        ...t,
        avgDowntime: parseFloat((t.totalDowntime / t.count).toFixed(2))
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getMonthlyTrend = () => {
    const monthMap = {};
    data.forEach(d => {
      const month = d.date.substring(0, 7);
      if (!monthMap[month]) {
        monthMap[month] = {
          month,
          total: 0,
          onTime: 0,
          downtime: 0
        };
      }
      monthMap[month].total += 1;
      if (d.completedOnTime) monthMap[month].onTime += 1;
      monthMap[month].downtime += d.downtime;
    });

    return Object.values(monthMap)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map(m => ({
        ...m,
        onTimeRate: parseFloat(((m.onTime / m.total) * 100).toFixed(1))
      }));
  };

  const stats = calculateStats();
  const equipmentStats = getEquipmentStats();
  const technicianStats = getTechnicianStats();
  const taskStats = getTaskStats();
  const monthlyTrend = getMonthlyTrend();

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#ef4444'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LCLS Maintenance Dashboard</h1>
          <p className="text-gray-600">Preventive Maintenance Analytics - Q1 2024</p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {['overview', 'equipment', 'technicians', 'tasks', 'trends', 'ai'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm text-gray-500 mb-1">Total Tasks</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTasks}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm text-gray-500 mb-1">On-Time Completion</h3>
                <p className="text-3xl font-bold text-green-600">{stats.onTimeRate}%</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm text-gray-500 mb-1">Scheduled Rate</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.scheduledRate}%</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm text-gray-500 mb-1">Total Downtime</h3>
                <p className="text-3xl font-bold text-red-600">{stats.totalDowntime}h</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics Summary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { metric: 'Scheduled', value: parseFloat(stats.scheduledRate) },
                  { metric: 'On-Time', value: parseFloat(stats.onTimeRate) },
                  { metric: 'With Downtime', value: parseFloat(((stats.tasksWithDowntime / stats.totalTasks) * 100).toFixed(1)) }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Analysis</h3>
              <p className="text-gray-700 mb-2">
                The facility completed {stats.totalTasks} maintenance tasks in Q1 2024. On-time completion rate of {stats.onTimeRate}% shows room for improvement. {stats.scheduledRate}% of tasks were scheduled, suggesting {(100 - parseFloat(stats.scheduledRate)).toFixed(1)}% were reactive or emergency work.
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-3 mt-4">Suggestions</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Increase scheduled maintenance to reduce reactive work and improve uptime</li>
                <li>Target on-time completion improvement to 95%+ through better resource planning</li>
                <li>Focus on tasks causing downtime - {stats.tasksWithDowntime} tasks generated {stats.totalDowntime}h downtime</li>
                <li>Average downtime per incident is {stats.avgDowntime}h - identify patterns to reduce impact</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'equipment' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Equipment Maintenance Frequency</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={equipmentStats} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="equipment" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Total Tasks" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Equipment On-Time Performance</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={equipmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="equipment" angle={-45} textAnchor="end" height={150} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="onTimeRate" fill="#10b981" name="On-Time %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Equipment Downtime Impact</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={equipmentStats.filter(e => e.downtime > 0).sort((a, b) => b.downtime - a.downtime)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="equipment" angle={-45} textAnchor="end" height={150} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="downtime" fill="#ef4444" name="Downtime (hrs)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Analysis</h3>
              <p className="text-gray-700 mb-2">
                X-ray Detector leads maintenance activity with {equipmentStats.find(e => e.equipment === 'X-ray Detector')?.total || 0} tasks. Equipment with lowest on-time rates needs attention for resource allocation or scheduling improvements.
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-3 mt-4">Suggestions</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Prioritize equipment with high downtime impact for preventive maintenance improvements</li>
                <li>Equipment with low on-time completion may need longer maintenance windows or additional technicians</li>
                <li>Consider predictive maintenance for high-frequency equipment to reduce unscheduled work</li>
                <li>Review maintenance procedures for equipment consistently causing downtime</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'technicians' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Technician Workload</h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={technicianStats}
                    dataKey="total"
                    nameKey="technician"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {technicianStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Technician On-Time Performance</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={technicianStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="technician" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="onTimeRate" fill="#8b5cf6" name="On-Time %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Technician Performance Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">Technician</th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">Total Tasks</th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">On-Time</th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">On-Time %</th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">Downtime (hrs)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {technicianStats.map((tech, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{tech.technician}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{tech.total}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{tech.onTime}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`font-medium ${tech.onTimeRate >= 80 ? 'text-green-600' : 'text-amber-600'}`}>
                            {tech.onTimeRate}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{tech.downtime.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Analysis</h3>
              <p className="text-gray-700 mb-2">
                Workload is distributed across {technicianStats.length} technicians. Performance varies from {Math.min(...technicianStats.map(t => t.onTimeRate))}% to {Math.max(...technicianStats.map(t => t.onTimeRate))}% on-time completion. Workload distribution appears uneven.
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-3 mt-4">Suggestions</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Balance workload more evenly across technicians to prevent burnout and improve efficiency</li>
                <li>Provide additional training for technicians with lower on-time rates</li>
                <li>Pair high-performing technicians with those needing support for knowledge transfer</li>
                <li>Analyze if specific equipment types cause delays for certain technicians</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Task Frequency Distribution</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={taskStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="task" angle={-45} textAnchor="end" height={150} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Average Downtime by Task Type</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={taskStats.filter(t => t.avgDowntime > 0).sort((a, b) => b.avgDowntime - a.avgDowntime)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="task" angle={-45} textAnchor="end" height={150} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgDowntime" fill="#f59e0b" name="Avg Downtime (hrs)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Task Type Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">Task</th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">Frequency</th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">Total Downtime (hrs)</th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-900">Avg Downtime (hrs)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {taskStats.map((task, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{task.task}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{task.count}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{task.totalDowntime.toFixed(1)}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`font-medium ${task.avgDowntime > 1 ? 'text-red-600' : 'text-green-600'}`}>
                            {task.avgDowntime}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Analysis</h3>
              <p className="text-gray-700 mb-2">
                {taskStats[0].task} is the most common task with {taskStats[0].count} occurrences. Tasks like Filter Replacement and Calibration show higher average downtime. Some tasks consistently complete without downtime.
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-3 mt-4">Suggestions</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Optimize procedures for high-downtime tasks to reduce impact duration</li>
                <li>Schedule downtime-heavy tasks during planned outages when possible</li>
                <li>Pre-stage parts and tools for common tasks to reduce execution time</li>
                <li>Document best practices from zero-downtime task completions</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Task Volume</h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Total Tasks" />
                  <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={2} name="On-Time" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly On-Time Rate Trend</h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="onTimeRate" stroke="#8b5cf6" strokeWidth={2} name="On-Time %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Downtime Trend</h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="downtime" stroke="#ef4444" strokeWidth={2} name="Downtime (hrs)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Analysis</h3>
              <p className="text-gray-700 mb-2">
                Task volume ranges from {Math.min(...monthlyTrend.map(m => m.total))} to {Math.max(...monthlyTrend.map(m => m.total))} tasks per month. On-time performance shows variation across months. Downtime correlates with task volume and completion delays.
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-3 mt-4">Suggestions</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Investigate months with lower on-time rates to identify resource constraints or seasonal factors</li>
                <li>Plan staffing levels to match predicted workload based on historical patterns</li>
                <li>Track leading indicators to predict high-workload months before they occur</li>
                <li>Use low-volume periods for training and procedure improvements</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Data Analysis</h2>
            <p className="text-gray-600 mb-6">Ask questions about your maintenance data and get AI-powered insights.</p>
            
            <div className="mb-4">
              <textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Example: Which equipment requires the most attention? What patterns do you see in the downtime data?"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
              />
            </div>

            <button
              onClick={askAI}
              disabled={aiLoading || !userQuery.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {aiLoading ? 'Analyzing...' : 'Ask AI'}
            </button>

            {aiResponse && (
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">AI Analysis</h3>
                <div className="text-gray-700 whitespace-pre-wrap">{aiResponse}</div>
              </div>
            )}

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Sample Questions</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="cursor-pointer hover:text-blue-600" onClick={() => setUserQuery("Which equipment has the highest failure rate?")}>
                  • Which equipment has the highest failure rate?
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => setUserQuery("What's causing the most downtime?")}>
                  • What's causing the most downtime?
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => setUserQuery("Which technicians need additional support?")}>
                  • Which technicians need additional support?
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => setUserQuery("What maintenance tasks should we prioritize?")}>
                  • What maintenance tasks should we prioritize?
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => setUserQuery("Are there any concerning trends in the data?")}>
                  • Are there any concerning trends in the data?
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceDashboard;