import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

export const OrgsManagePage = () => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newOrg, setNewOrg] = useState({
    name: '',
    type: 'school',
    contact_email: '',
    address: '',
    contact_phone: '',
  });

  const { showToast } = useToast();

  const fetchOrgs = async () => {
    try {
      const res = await apiClient.get('/admin/orgs');
      if (res.success) {
        setOrgs(res.data);
      }
    } catch (err) {
      showToast('Failed to load organizations', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post('/admin/orgs', newOrg);
      if (res.success) {
        showToast('Organization registered successfully', 'success');
        setOrgs((prev) => [...prev, res.data]);
        setIsModalOpen(false);
        setNewOrg({ name: '', type: 'school', contact_email: '', address: '', contact_phone: '' });
      }
    } catch (err) {
      showToast(err.message || 'Creation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading participating institutions..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Organizations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Registered schools, NGOs, and corporate partners in the TeenTalk safety network.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Add Organization
        </Button>
      </div>

      {/* Orgs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orgs.map((o) => (
          <Card key={o.id} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="primary">{o.type.toUpperCase()}</Badge>
                <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                  {o.code}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{o.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{o.contact_email}</p>
              {o.address && <p className="text-xs text-slate-600 mb-4">{o.address}</p>}
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Members</span>
                <span className="font-bold text-slate-800 text-sm">{o.total_members || 0}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Incidents</span>
                <span className="font-bold text-slate-800 text-sm">{o.total_incidents || 0}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Org Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Organization">
        <form onSubmit={handleCreate} className="space-y-4">
          <InputField
            label="Organization Name"
            placeholder="e.g. Greenwood International High"
            value={newOrg.name}
            onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
            required
          />

          <SelectField
            label="Organization Type"
            value={newOrg.type}
            onChange={(e) => setNewOrg({ ...newOrg, type: e.target.value })}
            options={[
              { value: 'school', label: 'School / Academic Institution' },
              { value: 'corporate', label: 'Corporate / Workplace (POSH)' },
              { value: 'ngo', label: 'Child Welfare NGO' },
            ]}
            required
          />

          <InputField
            label="Official Contact Email"
            type="email"
            placeholder="e.g. principal@greenwoodhigh.edu"
            value={newOrg.contact_email}
            onChange={(e) => setNewOrg({ ...newOrg, contact_email: e.target.value })}
            required
          />

          <InputField
            label="Physical Address / Location"
            placeholder="City, State"
            value={newOrg.address}
            onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Register Organization
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
