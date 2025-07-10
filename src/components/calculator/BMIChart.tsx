// "use client";

// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface BMIChartProps {
//   bmi: number;
//   age: number;
//   gender: 'male' | 'female';
//   height: number;
//   weight: number;
//   units: 'metric' | 'imperial';
// }

// // Moved getBMICategory function inside the component file
// const getBMICategory = (bmi: number, age: number) => {
//   if (!bmi) return null;

//   // Adjust BMI for older adults
//   let adjustedBMI = bmi;
//   if (age > 65) adjustedBMI *= 0.95;

//   if (adjustedBMI < 16) return { category: 'Severe Thinness', color: 'bg-red-600' };
//   if (adjustedBMI < 17) return { category: 'Moderate Thinness', color: 'bg-red-400' };
//   if (adjustedBMI < 18.5) return { category: 'Mild Thinness', color: 'bg-yellow-300' };
//   if (adjustedBMI < 25) return { category: 'Normal', color: 'bg-green-500' };
//   if (adjustedBMI < 30) return { category: 'Overweight', color: 'bg-yellow-500' };
//   if (adjustedBMI < 35) return { category: 'Obese Class I', color: 'bg-orange-500' };
//   if (adjustedBMI < 40) return { category: 'Obese Class II', color: 'bg-red-500' };
//   return { category: 'Obese Class III', color: 'bg-red-700' };
// };

// export default function BMIChart({ bmi, age, gender, height, weight, units }: BMIChartProps) {
//   if (!bmi) return null;

//   // Enhanced BMI categories with more granular ranges
//   const categories = [
//     { label: 'Severe Thinness', max: 16, color: '#ef4444' },
//     { label: 'Moderate Thinness', max: 17, color: '#f97316' },
//     { label: 'Mild Thinness', max: 18.5, color: '#f59e0b' },
//     { label: 'Normal', max: 25, color: '#4ade80' },
//     { label: 'Overweight', max: 30, color: '#f59e0b' },
//     { label: 'Obese I', max: 35, color: '#f97316' },
//     { label: 'Obese II', max: 40, color: '#ef4444' },
//     { label: 'Obese III', max: 100, color: '#b91c1c' },
//   ];

//   // Prepare data for the chart
//   const data = {
//     labels: categories.map(cat => cat.label),
//     datasets: [
//       {
//         label: 'BMI Range',
//         data: categories.map(cat => cat.max),
//         backgroundColor: categories.map(cat => `${cat.color}80`), // Add transparency
//         borderColor: categories.map(cat => cat.color),
//         borderWidth: 1,
//       },
//       {
//         label: 'Your BMI',
//         data: Array(categories.length).fill(0),
//         backgroundColor: '#1e40af',
//         borderWidth: 0,
//         borderRadius: 4,
//       },
//     ],
//   };

//   // Add the user's BMI to the appropriate category
//   const userCategoryIndex = categories.findIndex(cat => bmi <= cat.max);
//   if (userCategoryIndex >= 0) {
//     data.datasets[1].data[userCategoryIndex] = bmi;
//   }

//   // Calculate ideal weight range
//   const heightM = units === 'metric' ? height / 100 : height * 0.0254;
//   const minIdealWeight = 18.5 * heightM * heightM;
//   const maxIdealWeight = 25 * heightM * heightM;

//   const displayWeight = (kg: number) => {
//     return units === 'metric' 
//       ? `${kg.toFixed(1)} kg` 
//       : `${(kg * 2.20462).toFixed(1)} lbs`;
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         stacked: true,
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         stacked: false,
//         beginAtZero: true,
//         max: 45,
//         title: {
//           display: true,
//           text: 'BMI Value',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         labels: {
//           boxWidth: 12,
//           padding: 20,
//           usePointStyle: true,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context: any) {
//             if (context.datasetIndex === 1) {
//               const bmiCategory = getBMICategory(bmi, age);
//               return [
//                 `Your BMI: ${bmi.toFixed(1)}`,
//                 `Category: ${bmiCategory?.category || ''}`,
//                 `Healthy range: 18.5 - 24.9`,
//               ];
//             }
//             return `${context.dataset.label}: up to ${context.raw}`;
//           },
//           afterLabel: function(context: any) {
//             if (context.datasetIndex === 1) {
//               return [
//                 `Height: ${units === 'metric' ? height + 'cm' : `${Math.floor(height/12)}ft ${Math.round(height%12)}in`}`,
//                 `Weight: ${weight} ${units === 'metric' ? 'kg' : 'lbs'}`,
//                 `Ideal weight: ${displayWeight(minIdealWeight)} - ${displayWeight(maxIdealWeight)}`,
//               ];
//             }
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold">BMI Analysis</h3>
//         <div className={`px-3 py-1 rounded-full text-white ${getBMICategory(bmi, age)?.color || 'bg-gray-500'}`}>
//           {getBMICategory(bmi, age)?.category}
//         </div>
//       </div>
      
//       <div className="h-80 mb-4">
//         <Bar data={data} options={options} />
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//         <div className="bg-blue-50 p-3 rounded-lg">
//           <h4 className="font-medium text-blue-800 mb-1">Your BMI</h4>
//           <p className="text-blue-700 text-2xl font-bold">{bmi.toFixed(1)}</p>
//           <p className="text-blue-600">Healthy range: 18.5 - 24.9</p>
//         </div>
        
//         <div className="bg-green-50 p-3 rounded-lg">
//           <h4 className="font-medium text-green-800 mb-1">Ideal Weight</h4>
//           <p className="text-green-700">
//             {displayWeight(minIdealWeight)} - {displayWeight(maxIdealWeight)}
//           </p>
//           <p className="text-green-600">Based on your height</p>
//         </div>
        
//         <div className="bg-purple-50 p-3 rounded-lg">
//           <h4 className="font-medium text-purple-800 mb-1">Health Status</h4>
//           <p className="text-purple-700">
//             {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : 'Overweight'}
//           </p>
//           <p className="text-purple-600">
//             {bmi < 18.5 ? 'Consider nutritional support' : 
//              bmi < 25 ? 'Maintain healthy habits' : 
//              'Consider lifestyle changes'}
//           </p>
//         </div>
//       </div>
      
//       <div className="mt-4 pt-4 border-t">
//         <h4 className="font-medium text-gray-800 mb-2">BMI Categories</h4>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
//           {categories.map((cat) => (
//             <div key={cat.label} className="flex items-center">
//               <span 
//                 className="w-3 h-3 rounded-full mr-2" 
//                 style={{ backgroundColor: cat.color }}
//               />
//               <span>
//                 {cat.label}: {cat.label === 'Obese III' ? '>40' : 
//                 cat.label === 'Severe Thinness' ? '<16' : 
//                 `${categories[categories.indexOf(cat)-1]?.max || 0}-${cat.max}`}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BMIChartProps {
  bmi: number;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  units: 'metric' | 'imperial';
}

const getBMICategory = (bmi: number, age: number) => {
  if (!bmi) return null;

  let adjustedBMI = bmi;
  if (age > 65) adjustedBMI *= 0.95;

  if (adjustedBMI < 16) return { category: 'Severe Thinness', color: 'bg-red-600' };
  if (adjustedBMI < 17) return { category: 'Moderate Thinness', color: 'bg-red-400' };
  if (adjustedBMI < 18.5) return { category: 'Mild Thinness', color: 'bg-yellow-300' };
  if (adjustedBMI < 25) return { category: 'Normal', color: 'bg-green-500' };
  if (adjustedBMI < 30) return { category: 'Overweight', color: 'bg-yellow-500' };
  if (adjustedBMI < 35) return { category: 'Obese Class I', color: 'bg-orange-500' };
  if (adjustedBMI < 40) return { category: 'Obese Class II', color: 'bg-red-500' };
  return { category: 'Obese Class III', color: 'bg-red-700' };
};

export default function BMIChart({ bmi, age, height, weight, units }: BMIChartProps) {
  if (!bmi) return null;

  const categories = [
    { label: 'Severe Thinness', max: 16, color: '#ef4444' },
    { label: 'Moderate Thinness', max: 17, color: '#f97316' },
    { label: 'Mild Thinness', max: 18.5, color: '#f59e0b' },
    { label: 'Normal', max: 25, color: '#4ade80' },
    { label: 'Overweight', max: 30, color: '#f59e0b' },
    { label: 'Obese I', max: 35, color: '#f97316' },
    { label: 'Obese II', max: 40, color: '#ef4444' },
    { label: 'Obese III', max: 100, color: '#b91c1c' },
  ];

  const data = {
    labels: categories.map(cat => cat.label),
    datasets: [
      {
        label: 'BMI Range',
        data: categories.map(cat => cat.max),
        backgroundColor: categories.map(cat => `${cat.color}80`),
        borderColor: categories.map(cat => cat.color),
        borderWidth: 1,
      },
      {
        label: 'Your BMI',
        data: Array(categories.length).fill(0),
        backgroundColor: '#1e40af',
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  const userCategoryIndex = categories.findIndex(cat => bmi <= cat.max);
  if (userCategoryIndex >= 0) {
    data.datasets[1].data[userCategoryIndex] = bmi;
  }

  const heightM = units === 'metric' ? height / 100 : height * 0.0254;
  const minIdealWeight = 18.5 * heightM * heightM;
  const maxIdealWeight = 25 * heightM * heightM;

  const displayWeight = (kg: number) => {
    return units === 'metric' 
      ? `${kg.toFixed(1)} kg` 
      : `${(kg * 2.20462).toFixed(1)} lbs`;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        max: 45,
        title: {
          display: true,
          text: 'BMI Value',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            if (context.datasetIndex === 1) {
              const bmiCategory = getBMICategory(bmi, age);
              return [
                `Your BMI: ${bmi.toFixed(1)}`,
                `Category: ${bmiCategory?.category || ''}`,
                `Healthy range: 18.5 - 24.9`,
              ];
            }
            return `${context.dataset.label}: up to ${context.raw}`;
          },
          afterLabel: function (context: TooltipItem<'bar'>) {
            if (context.datasetIndex === 1) {
              return [
                `Height: ${units === 'metric' ? height + 'cm' : `${Math.floor(height / 12)}ft ${Math.round(height % 12)}in`}`,
                `Weight: ${weight} ${units === 'metric' ? 'kg' : 'lbs'}`,
                `Ideal weight: ${displayWeight(minIdealWeight)} - ${displayWeight(maxIdealWeight)}`,
              ];
            }
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">BMI Analysis</h3>
        <div className={`px-3 py-1 rounded-full text-white ${getBMICategory(bmi, age)?.color || 'bg-gray-500'}`}>
          {getBMICategory(bmi, age)?.category}
        </div>
      </div>

      <div className="h-80 mb-4">
        <Bar data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-1">Your BMI</h4>
          <p className="text-blue-700 text-2xl font-bold">{bmi.toFixed(1)}</p>
          <p className="text-blue-600">Healthy range: 18.5 - 24.9</p>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <h4 className="font-medium text-green-800 mb-1">Ideal Weight</h4>
          <p className="text-green-700">
            {displayWeight(minIdealWeight)} - {displayWeight(maxIdealWeight)}
          </p>
          <p className="text-green-600">Based on your height</p>
        </div>

        <div className="bg-purple-50 p-3 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-1">Health Status</h4>
          <p className="text-purple-700">
            {bmi < 18.5 ? 'Underweight' : bmi < 25 ? "You're in good shape" : 'Overweight'}
          </p>
          <p className="text-purple-600">
            {bmi < 18.5 ? 'Consider nutritional support' : 
             bmi < 25 ? 'Maintain healthy habits' : 
             'Consider lifestyle changes'}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <h4 className="font-medium text-gray-800 mb-2">BMI Categories</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {categories.map((cat, index) => (
            <div key={cat.label} className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: cat.color }}
              />
              <span>
                {cat.label}: {cat.label === 'Obese III' ? '>40' :
                cat.label === 'Severe Thinness' ? '<16' :
                `${categories[index - 1]?.max || 0}-${cat.max}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
