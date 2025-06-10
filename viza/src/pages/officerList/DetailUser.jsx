"use client";
import React from "react";
import { Card, Descriptions, Tag, Image, Modal } from "antd";
import dayjs from "dayjs";
import { X, User, FileText, MapPin, Calendar, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const DetailCard = ({ data,open,onCancel }) => {
  const {
    user,
    visaType,
    photo,
    aadhar,
    passport,
    father,
    address,
    city,
    state,
    status,
    createdAt,
  } = data;

 const statusConfig = {
    pending: {
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: AlertCircle,
      label: 'PENDING'
    },
    approved: {
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: CheckCircle,
      label: 'APPROVED'
    },
    rejected: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle,
      label: 'REJECTED'
    }
  };

  const StatusIcon = statusConfig[status].icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!open) return null;

  return (
    <Modal width={1000} open={open} onCancel={onCancel} footer={false} closable={false} >

   <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onCancel} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <p className="text-sm text-gray-500">Comprehensive application overview</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* User Information */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">User Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                  <p className="text-gray-800 capitalize">{user.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Account Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    user.isActive 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Application Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Visa Type</label>
                <p className="text-lg font-semibold text-gray-900">{visaType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Father's Name</label>
                <p className="text-gray-800">{father}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Application Status</label>
                <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[status].color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span>{statusConfig[status].label}</span>
                </span>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                <p className="text-gray-800">{address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                <p className="text-gray-800">{city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                <p className="text-gray-800">{state}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">Application Date</label>
                <div className="flex items-center space-x-2 text-gray-800">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{formatDate(createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Supporting Documents</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Photograph', image: photo, bgColor: 'from-rose-500 to-pink-500' },
                { label: 'Aadhar Card', image: aadhar, bgColor: 'from-orange-500 to-amber-500' },
                { label: 'Passport', image: passport, bgColor: 'from-emerald-500 to-teal-500' }
              ].map((doc, index) => (
                <div key={index} className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-3">{doc.label}</label>
                  {/* <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white shadow-sm hover:shadow-md"> */}
                  {/* /  <div className={`absolute inset-0 bg-gradient-to-br ${doc.bgColor} opacity-10 group-hover:opacity-20 transition-opacity`} /> */}
                    <Image
                      src={`http://localhost:7000/uploads/${doc.image}`}
                      alt={doc.label}
                      // className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      height={300}
                      width={300}
                      onError={(e) => {
                        e.target.src = 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
                      }}
                    />
                    {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" /> */}
                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
      </Modal>
  );
};

export default DetailCard;
