"use client";

type HealthTipsProps = {
  bmi: number;
  age: number;
  gender: 'male' | 'female';
  bodyFatPercentage?: number;
};

export default function HealthTips({ bmi, age, gender, bodyFatPercentage }: HealthTipsProps) {
  if (!bmi) return null;

  // Adjust BMI for older adults (consistent with BMIResult component)
  const adjustedBMI = age > 65 ? bmi * 0.95 : bmi;

  const getCategoryTips = () => {
    if (adjustedBMI < 16) {
      return {
        title: 'Severe Thinness Recommendations',
        urgency: 'high',
        tips: [
          'Consult a healthcare professional immediately for nutritional support',
          'Focus on calorie-dense, nutrient-rich foods like nuts, seeds, and healthy oils',
          'Consider small, frequent meals to increase calorie intake',
          'Monitor weight weekly and seek medical advice if losing weight',
        ],
      };
    } else if (adjustedBMI < 17) {
      return {
        title: 'Moderate Thinness Advice',
        urgency: 'medium',
        tips: [
          'Increase protein intake with foods like eggs, fish, and legumes',
          'Incorporate strength training to build healthy muscle mass',
          'Add healthy snacks between meals (nuts, cheese, yogurt)',
          'Consider a nutritionist for personalized meal planning',
        ],
      };
    } else if (adjustedBMI < 18.5) {
      return {
        title: 'Mild Thinness Guidance',
        urgency: 'low',
        tips: [
          'Gradually increase calorie intake with whole foods',
          'Focus on nutrient density rather than just calories',
          'Combine cardio with resistance training for balanced fitness',
          'Monitor progress monthly and adjust as needed',
        ],
      };
    } else if (adjustedBMI < 25) {
      return {
        title: 'Healthy Weight Maintenance',
        urgency: 'none',
        tips: [
          'Maintain balanced diet with colorful fruits and vegetables',
          'Engage in 150-300 mins moderate exercise weekly (WHO recommendation)',
          'Include both cardio and strength training in your routine',
          'Practice mindful eating and stay hydrated',
        ],
      };
    } else if (adjustedBMI < 30) {
      return {
        title: 'Overweight Management',
        urgency: 'low',
        tips: [
          'Aim for 1-2 lbs weight loss per week for sustainable results',
          'Reduce added sugars and refined carbohydrates',
          'Increase daily movement (walking, taking stairs)',
          'Keep a food journal to identify patterns',
        ],
      };
    } else if (adjustedBMI < 35) {
      return {
        title: 'Obese Class I Recommendations',
        urgency: 'medium',
        tips: [
          'Consult healthcare provider before starting any weight loss program',
          'Focus on building sustainable habits rather than quick fixes',
          'Start with low-impact activities like swimming or cycling',
          'Prioritize sleep and stress management',
        ],
      };
    } else if (adjustedBMI < 40) {
      return {
        title: 'Obese Class II Guidance',
        urgency: 'high',
        tips: [
          'Seek medical supervision for weight management',
          'Consider working with a multidisciplinary health team',
          'Begin with gentle movement and gradually increase activity',
          'Address emotional eating patterns with professional help if needed',
        ],
      };
    } else {
      return {
        title: 'Obese Class III Action Plan',
        urgency: 'critical',
        tips: [
          'Immediate medical consultation recommended',
          'Comprehensive health assessment needed',
          'Supervised weight management program advised',
          'Focus on achievable health goals beyond just weight',
        ],
      };
    }
  };

  const getBodyFatTips = () => {
    if (!bodyFatPercentage) return [];
    
    if (gender === 'male') {
      if (bodyFatPercentage < 6) return ['Ensure adequate essential fat intake'];
      if (bodyFatPercentage < 14) return ['Maintain current fitness routine'];
      if (bodyFatPercentage < 18) return ['Consider body recomposition strategies'];
      if (bodyFatPercentage < 25) return ['Monitor body fat trends'];
      return ['Focus on reducing visceral fat through diet and exercise'];
    } else {
      if (bodyFatPercentage < 14) return ['Ensure adequate essential fat intake'];
      if (bodyFatPercentage < 21) return ['Maintain current fitness routine'];
      if (bodyFatPercentage < 25) return ['Consider body recomposition strategies'];
      if (bodyFatPercentage < 32) return ['Monitor body fat trends'];
      return ['Focus on reducing visceral fat through diet and exercise'];
    }
  };

  const getAgeSpecificTips = () => {
    const tips: string[] = [];
    
    if (age >= 65) {
      tips.push(
        'Include resistance training 2-3 times weekly to combat sarcopenia',
        'Ensure adequate protein intake (1.0-1.2g per kg of body weight)',
        'Focus on balance exercises to prevent falls',
        'Consider vitamin D supplementation (consult doctor first)'
      );
    } else if (age >= 50) {
      tips.push(
        'Increase calcium-rich foods for bone health',
        'Monitor metabolic health markers regularly',
        'Adjust calorie intake as metabolism slows'
      );
    }

    return tips;
  };

  const getGenderSpecificTips = () => {
    return gender === 'female'
      ? [
          'Ensure adequate iron intake, especially if menstruating',
          'Include calcium-rich foods for bone health',
          'Be mindful of hormonal changes affecting weight'
        ]
      : [
          'Monitor alcohol consumption as it affects abdominal fat',
          'Pay attention to heart health indicators',
          'Men typically need more calories but watch portion sizes'
        ];
  };

  const categoryTips = getCategoryTips();
  const bodyFatTips = getBodyFatTips();
  const ageTips = getAgeSpecificTips();
  const genderTips = getGenderSpecificTips();

  const allTips = [
    ...categoryTips.tips,
    ...bodyFatTips,
    ...ageTips,
    ...genderTips
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Personalized Health Recommendations</h3>
        {categoryTips.urgency !== 'none' && (
          <span className={`px-3 py-1 text-sm rounded-full text-white ${
            categoryTips.urgency === 'critical' ? 'bg-red-700' :
            categoryTips.urgency === 'high' ? 'bg-red-500' :
            categoryTips.urgency === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
          }`}>
            {categoryTips.urgency === 'critical' ? 'Critical' :
             categoryTips.urgency === 'high' ? 'High Priority' :
             categoryTips.urgency === 'medium' ? 'Moderate Priority' : 'Mild Priority'}
          </span>
        )}
      </div>
      
      <h4 className="text-lg font-medium mb-3">{categoryTips.title}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium text-gray-800 mb-2">Primary Recommendations</h5>
          <ul className="list-disc pl-5 space-y-2">
            {categoryTips.tips.map((tip, index) => (
              <li key={`cat-${index}`} className="text-gray-700">
                {tip}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          {bodyFatTips.length > 0 && (
            <>
              <h5 className="font-medium text-gray-800 mb-2">Body Composition Tips</h5>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                {bodyFatTips.map((tip, index) => (
                  <li key={`fat-${index}`} className="text-gray-700">
                    {tip}
                  </li>
                ))}
              </ul>
            </>
          )}
          
          <h5 className="font-medium text-gray-800 mb-2">{gender === 'female' ? 'Women' : 'Men'}'s Health</h5>
          <ul className="list-disc pl-5 space-y-2">
            {genderTips.map((tip, index) => (
              <li key={`gender-${index}`} className="text-gray-700">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {ageTips.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h5 className="font-medium text-gray-800 mb-2">Age-Specific Advice</h5>
          <ul className="list-disc pl-5 space-y-2">
            {ageTips.map((tip, index) => (
              <li key={`age-${index}`} className="text-gray-700">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}