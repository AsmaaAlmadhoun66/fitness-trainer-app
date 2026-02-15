import React from "react";

let ArabicTranslation;
ArabicTranslation = {
  local: 'ar',
  shared: {
    add: 'إضافة',
    send: 'إرسال',
    edit: 'تعديل',
    remove: 'حذف',
    reject: 'رفض',
    accept: 'قبول',
    save: 'حفظ',
    cancel: 'الغاء',
    update: 'تحديث',
    empty: 'لا يوجد بيانات',
    breakday: 'يوم إستراحة',
    errors: {
      notFoundUser: 'مستخدم غير موجود',
      globalError: 'لقد حدث خطأ يرجى المحاولة ثانية'
    },
    success: {
      accountCreated: 'تم إنشاء الحساب بنجاح',
      deletedSuccess: 'تم الحذف بنجاح',
      addedSuccess: 'تم الإضافة بنجاح',

    },
    warnings: {
      emailExistBefore: 'البريد الألكترونى مستخدم من قبل'
    }
  },
  breadcrumb: {
    overview: 'عام',
    request: 'الطلبات',
    profile: 'الصفحة الشخصية',
    setting: 'ضبط',
    templates: 'نماذج',
    inviteTrainee: 'دعوة متدرب'
  },
  login: {
    title: 'تسجيل دخول',
    userName: 'أسم المستخدم',
    password: 'كلمة المرور',
    rememberMe: 'تذكرنى',
    forgetPW: 'هل نسيت كلمة المرور ؟',
    newTrainer: 'مدرب جديد ؟',
    signUp: 'الأشتراك'
  },
  register: {
    title: 'التسجيل',
    email: 'البريد الألكترونى',
    fullName: 'الأسم بالكامل',
    hasAccount: 'هل تمتلك حساب ؟',
    miranTrainer: 'مدرب',
    sasTrainer: 'مدرب SaaS',
    experienceYear: 'سنوات الخبرة',
    phoneNumber: 'رقم الهاتف',
    nationality: 'الجنسية',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    languages: 'اللغات',
    lang: 'اللغة',
    aboutMe: 'نبذه عنى',
    profileImg: 'الصورة الشخصية',
    addDoc: 'أضافة مستندات',
    next: 'التالى',
    previous: 'السابق'
  },
  forgetPwPage: {
    success: "تم ارسال رابط تغيير كلمة المرور على البريد الألكترونى",
    failed: "البريد الألكترونى غير موجود"
  },
  menu: {
    dashboard: 'لوحة التحكم',
    chats: 'المحادثات',
    addUser: 'اضافة متدرب',
    trainees: 'المتدربين',
    profile: 'الصفحة الشخصية',
    templates: 'نماذج',
    settings: 'الضبط',
    logout: 'تسجيل الخروج'
  },
  header: {
    searchTitle: 'كلمة البحث',
    trainer: 'مدرب',
  },
  request: {
    request: 'الطلبات',
    viewRequest: 'عرض الطلب',
    onHold: 'بانتظار القبول',
    newRequest: 'طلبات جديدة',
    invitationsTrainees: 'دعوات متدربين'
  },
  traineeModal: {
    title: 'خطة',
    Calories: 'السعرات الحرارية',
    exercises: 'التمرين',
    meals: 'الوجبات',
    mealDetails: 'تفاصيل الوجبة',
    calories: 'سعرات حراريه',
    carbs: 'كربوهيدرات',
    fat: 'دهون',
    protein: 'بروتين',
    totalDayIntakes: 'إجمالى ماأخذ اليوم',
    totalTargetIntakes: 'إجمالى المستهدف',
    addMeal: 'إضافة وجبة',
    mealTitle: 'عنوان الوجبة',
    breakDay: 'يوم عطلة',
    copyMeal: 'نسخ الوجبة',
    addExercise: 'تمرين',
    copyExercise: 'نسخ تمرين',
    searchFor: 'بحث',
    gram: 'جم',
    kGram: 'كجم',
    remainingDays: 'أيام متبقية',
    note: 'ملاحظة',
    addNote: 'أضف ملاحظة',
    notes: 'ملاحظات',
    Reps: 'عدد العضلات',
    rest: 'فترة الراحة',
    sets: 'مجموعات',
    titleCopyMeal: 'كم عدد الأيام المقترحة',
    emptyDataExercise: 'هذا اليوم لا يحتوي على تمارين بعد',
    emptyDataMeal: 'هذا اليوم لا يحتوي على وجبات بعد'
  },
  profile: {
    fullName: 'الإسم بالكامل',
    email: 'البريد الإلكترونى',
    tele: 'الجوال',
    gender: 'النوع',
    country: 'الدولة',
    aboutMe: 'نبذة عني',
    BirthDate: 'تاريخ الميلاد',
    nationality: 'الجنسية',
    height: 'الطول',
    levelOfActivity: 'مرحلة النشاط',
    warning: 'التحذير',
    Allergies: 'الحساسية',
    myGoal: 'أهدافي'
  },
  settingPage: {
    language: 'اللغة',
    receiveTrainingRequest: 'استقبال طلبات التدريب',
    receiveRenewalRequest: 'استقبال طلبات التجديد',
    notification: 'التنبيهات'
  },
  templatePage: {
    assign: 'تعيين',
    add: 'اضافة نموذج',
    numberOf: 'أضف رقم',
    comments: 'تعليق',
    templateName: 'اسم القالب',
    chooseTrainee: 'اختر المدرب',
    date: 'التاريخ',
    addFood: 'أضف طعام'
  },
  faqPage: {
    faq: 'أسئلة شائعة',
    addQuestion: 'إضافة سؤال',
    question: 'السؤال',
    answer: 'الإجابة',
  },
  progressPage: {
    progress: 'المتابعة',
    measurement: 'القياسات',
    weight: 'الوزن',
    water: 'الماء',
    picture: 'الصور',
    current: 'الحالي',
    target: 'الهدف',
    day: 'اليوم',
    value: 'القيمة',
    change: 'التغيير',
    weightChanges: 'تغيير الوزن',
    changesWaist: 'تغييرات الخصر'
  }

};

  export default ArabicTranslation;