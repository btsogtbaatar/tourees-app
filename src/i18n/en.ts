export default {
  l_email: 'Please enter your email address.',
  l_username: 'Your name',
  b_email: 'Email',
  b_phonenumber: 'Phone',
  l_emaillabel: 'Your email address',
  l_usernamelabel: 'Username',
  l_usernametitle: 'You can log in with this name.',
  i_email: 'Email',
  i_phone: 'Phone',
  b_continue: 'Continue',
  r_username: 'Please enter your username.',
  l_signup: 'Sign up',
  l_confirm: 'Confirm',
  l_phone: 'Your phone number',
  t_serviceterm: 'Terms of service',
  m_email: 'Please enter your email address correctly.',
  m_phone: 'Please enter your phone number.',
  t_home: 'Home',
  myTask: 'Requests',
  profile: 'My',
  l_register_infomation: 'Registration information',
  l_history: 'History',
  l_ebarimt: 'E-receipt',
  l_help: 'Help',
  l_logout: 'Logout',
  l_dismissLabel: 'Got it',
  l_submitLabel: 'Ok',
  signUp: {
    hello: 'Hello?',
    welcome_seed: 'Welcome to the Seed platform.',
    understand: 'Got it',
    login: 'Login',
  },
  form: {
    firstName: {
      label: 'First name',
      placeHolder: 'First name',
      errors: { required: 'Please enter your first name.', validation: '' },
    },
    lastName: {
      label: 'Last name',
      placeHolder: 'Last name',
      errors: { required: 'Please enter your last name.', validation: '' },
    },
    address: {
      label: 'Address',
      placeHolder: 'Address',
      errors: {
        required: 'Please enter your address.',
        validation: 'Please enter your address.',
      },
    },
    taskerType: {
      label: 'Type',
      errors: {
        required: 'Please enter the type.',
      },
    },
    profile: {
      label: 'Picture',
      placeHolder: 'Picture',
      errors: { required: 'Please upload a picture.', validation: 'Please upload a picture.' },
    },
  },
  tasker: {
    type: {
      INDIVIDUAL: 'Individual',
      BUSINESS: 'Business',
    },
  },
  profile: {
    language: 'Language',
    mongolia: 'Mongolian',
    l_register_infomation: 'Registration information',
    l_history: 'History',
    l_ebarimt: 'E-receipt',
    t_serviceterm: 'Terms of service',
    l_help: 'Help',
    l_logout: 'Logout',
    seeProfile: 'View profile',
  },
  tab: {
    tabHome: 'Home',
    tabMyTasks: 'My tasks',
    tabBrowseTasks: 'Tasks',
    tabProfile: 'Settings',
  },
  home: {
    category: {
      question: 'What service are you looking for?',
      title: 'Types of services',
      search: 'Search',
    },
  },
  subCategoryList: {
    search: {
      placeholder: 'Search',
    },
    subtitle: {
      placeholder: 'Write description',
    },
  },
  addressMapView: {
    autoComplete: {
      placeholder: 'Please enter the address to search.',
      loading: 'Loading...',
      notFound: 'Address not found.',
    },
    continue: 'Continue',
  },
  addressDetail: {
    label: 'Detailed information',
    from: 'Pick-up location details',
    to: 'Drop-off location details',
    continue: 'Continue',
  },
  request: {
    requestNewMessage:
      'Your request has been successfully registered, we will connect you with a suitable service provider shortly. If you wish to cancel, please contact the operator immediately!',
    logoTitle: 'Seed Bot',
    operatorCall: 'Contact operator',
    requestOperatorMessage:
      'Your request has been assigned. Bold will contact you shortly, please wait.',
    requestDone: 'Done',
    requestDetailMsg: 'Request details',
    requestDetail: 'Detailed description',
    requestName: 'Name',
    requestNamePlaceholder: 'Example: In-town move',
    requestDetailWarning: 'Please provide a detailed description!',
    requestAddress: 'Address',
    requestAddressMsg: 'Please enter your address.',
    requestImages: 'Upload pictures',
    requestImageWarning: 'Please upload pictures.',
    requestEdit: 'Edit',
    requestDestinationAddress: 'Pick-up location',
    requestDeliveryAddress: 'Drop-off location',
    requestCreate: 'Create request',
    requestDeliveryDate: 'Select delivery date',
    offer: 'offer',
    status: {
      NEW: 'New',
      ASSIGNED: 'Assigned',
      IN_PROGRESS: 'In progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled',
    },
    postedBy: 'Posted by',
    date: 'Request date',
    images: 'Images',
    price: 'Request price',
    offerButton: 'Create offer',
    offerLabel: 'Offers',
  },
  offer: {},
  userRequest: {
    success: {
      title: 'Success',
      message: 'Your request has been created successfully.',
    },
    address: {
      label: 'Address details',
      from: 'Pick-up location',
      to: 'Drop-off location',
      edit: 'Edit',
    },
    messages: {
      description: {
        required: 'Please enter a description.',
      },
      files: {
        required: 'Please upload at least one image.',
      },
      addresses: {
        required: 'Please enter the addresses.',
      },
    },
  },
  login: {
    title: 'Login',
    email: {
      tab: 'Email',
      label: 'Email address',
      placeholder: 'example@email.com',
      errors: {
        required: 'Please enter your email address.',
        validation: 'Please enter a valid email address.',
      },
    },
    or: 'or',
    phone: {
      tab: 'Phone',
      label: 'Phone number',
      placeholder: '88888888',
      errors: {
        required: 'Please enter your phone number.',
        validation: 'Please enter a valid phone number.',
      },
    },
    socialError: {
      title: 'Error',
      waitPrevious: 'Please wait for the previous request to complete.',
      playServiceUnvailable: 'Please download Play service.',
    },
    check: {
      label: 'Check',
    },
  },
  calendar: {
    today: 'Today',
    tomorrow: 'Tomorrow',
    selectDate: 'Select',
    afternoon: 'Afternoon',
    morningTimeRange: 'Before 10AM',
    midday: 'Midday',
    middayTimeRange: '10AM - 2PM',
    evening: 'Evening',
    eveningTimeRange: '2PM - 6PM',
    morning: 'Morning',
    afternoonTimeRange: 'After 6PM',
    cancel: 'Cancel',
    title: 'Select a date',
  },
  emptyRequest: 'You have no created requests.',
  headers: {
    home: 'Home',
    login: 'Login',
    register: 'Sign up',
    category: 'Types of services',
    address: 'Select address',
    request: 'Request',
    biometric: 'Biometric',
    createPin: 'Create pin',
    retypePin: 'Retype pin',
    taskPrice: 'Task price',
    createOffer: 'Create offer',
  },
  taskPrice: {
    submit: 'Save',
  },
  otp: {
    your: 'Your',
    requestCode: 'Enter the 4-digit code sent to',
    resendCode: 'Resend code',
    resend: 'resend',
  },
};
