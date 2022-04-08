import React from 'react';

export default function loading() {
  return (
    <div>
      <div className="h-screen py-20 px-3">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className="bg-white rounded">
                <div className="h- p-3">
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-700 rounded animate-pulse"></div>

                    <div className="..."></div>
                    <div className="col-span-2 ..."></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
