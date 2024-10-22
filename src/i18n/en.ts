export default {
  error: 'Error',
  successful: 'Successful',
  l_email: 'Please enter your email address.',
  l_username: 'Your name',
  b_email: 'Email',
  b_phonenumber: 'Phone',
  l_emaillabel: 'Your email address',
  l_usernamelabel: 'Username',
  l_usernametitle: 'You will be able to log in with this name.',
  i_email: 'Email',
  i_phone: 'Phone',
  b_continue: 'Continue',
  r_username: 'Please enter your username.',
  l_signup: 'Sign up',
  l_confirm: 'Confirm',
  l_phone: 'Your phone number',
  t_serviceterm: 'Terms of Service',
  m_email: 'Please enter your email address correctly.',
  m_phone: 'Please enter your phone number.',
  t_home: 'Home',
  myTask: 'Requests',
  l_register_infomation: 'Registration information',
  l_history: 'History',
  l_ebarimt: 'E-Receipt',
  l_help: 'Help',
  l_logout: 'Logout',
  l_dismissLabel: 'Got it',
  l_submitLabel: 'Ok',
  l_date: 'Please enter the date and time.',
  signUp: {
    hello: 'Hello?',
    welcome_seed: 'Welcome to the Seed platform.',
    understand: 'Understood',
    login: 'Log in',
    continue: 'Continue',
  },
  form: {
    fullName: {
      label: 'Name',
    },
    firstName: {
      label: 'First Name',
      placeHolder: 'First Name',
      errors: { required: 'Please enter your first name.', validation: '' },
    },
    lastName: {
      label: 'Last Name',
      placeHolder: 'Last Name',
      errors: { required: 'Please enter your last name.', validation: '' },
    },
    address: {
      label: 'Address',
      placeHolder: 'Address',
      errors: {
        required: 'Please enter your address.',
        validation: 'Please enter your address',
      },
    },
    taskerType: {
      label: 'Type',
      errors: {
        required: 'Please enter a type.',
      },
    },
    profile: {
      label: 'Picture',
      placeHolder: 'Picture',
      errors: {
        required: 'Please upload a picture',
        validation: 'Please upload a picture',
      },
    },
  },
  tasker: {
    type: {
      INDIVIDUAL: 'Individual',
      BUSINESS: 'Business',
    },
    education: 'Education',
    specialities: 'Specialties',
    languages: 'Languages',
    rank: 'Rank',
    portfolio: 'Portfolio',
    workingType: {
      name: 'Working Type',
      ONLINE: 'Online',
      PHYSICALLY: 'In-person',
    },
    tagLine: 'tagLine',
    description: 'description',
  },
  profile: {
    language: 'Language',
    language_label: 'English',
    l_user_infomation: 'General Information',
    l_service: 'Post a service',
    l_register_infomation: 'Registration Information',
    l_history: 'History',
    l_ebarimt: 'E-Receipt',
    t_serviceterm: 'Terms of Service',
    l_help: 'Help',
    l_logout: 'Logout',
    seeProfile: 'View Profile',
    imageSuccess: {
      title: 'Successful',
      message: 'Picture changed successfully.',
    },
    l_setup_profile: 'Edit Profile',
  },
  tab: {
    tabHome: 'Home',
    tabMyTasks: 'My Tasks',
    tabBrowseTasks: 'Tasks',
    tabProfile: 'Settings',
  },
  home: {
    category: {
      question: 'What service do you want to receive?',
      title: 'Types of Services',
      search: 'Search',
    },
    loginAsContractor: 'Log in as Service Provider',
    signUpAsContractor: 'Sign up as Service Provider',
    services: {
      main: 'Events and wedding services',
      search: 'Services search',
      question: 'Browse listed services',
    },
  },
  subCategoryList: {
    search: {
      placeholder: 'Search',
    },
    subtitle: {
      placeholder: 'Write a description',
    },
  },
  addressMapView: {
    autoComplete: {
      placeholder: 'Please enter the address you want to search.',
      loading: 'Loading...',
      notFound: 'Address not found.',
    },
    continue: 'Continue',
  },
  addressDetail: {
    label: 'Detailed Information',
    from: 'Detailed information of pickup location',
    to: 'Detailed information of drop-off location',
    continue: 'Continue',
    apartmentLabel: 'Apartment Number',
    apartmentPlaceholder: 'Example: Apartment 2',
    floorLabel: 'Floor',
    unitLabel: 'Unit',
    unitPlaceholder: 'Example: 106',
    floorPlaceholder: 'Example: 3',
  },
  request: {
    requestNewMessage:
      'Your request has been successfully registered, we will connect you with a suitable contractor shortly. If you wish to cancel, please contact the operator immediately!',
    logoTitle: 'Seed Bot',
    operatorCall: 'Contact Operator',
    requestOperatorMessage:
      'Your request has been assigned. Bold will contact you soon, so please wait.',
    requestDone: 'Done',
    requestDetailMsg: 'Detailed information of the request',
    requestDetail: 'Detailed description',
    requestName: 'Name',
    requestNamePlaceholder: 'Example: Moving within the city',
    requestDetailWarning: 'Please provide a detailed description!',
    requestAddress: 'Address',
    requestAddressMsg: 'Please enter your address.',
    requestImages: 'Upload Image',
    requestImageWarning: 'Please upload an image',
    requestEdit: 'Edit',
    requestDestinationAddress: 'Pickup Location',
    requestDeliveryAddress: 'Drop-off Location',
    requestCreate: 'Create Request',
    requestDeliveryDate: 'Select Delivery Date',
    offer: 'offer',
    status: {
      NEW: 'New',
      ASSIGNED: 'Assigned',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled',
    },
    postedBy: 'Request created by',
    date: 'Request Date',
    images: 'Images',
    price: 'Request Price',
    offerButton: 'Create Offer',
    offerLabel: 'Offers',
  },
  offer: {
    approve: 'Approve',
    description: 'Description',
    enterFields: 'Please enter the details of your offer in the fields below.',
    success: 'Your offer has been successfully submitted.',
    notFound: 'No offer currently exists.',
  },
  biometric: {
    consent: 'Do you consent to the use of biometric information?',
    doNotShowAgain: 'Do not show again',
    accept: 'Yes',
    decline: 'No',
    notSavedError: 'Biometric information has not been saved.',
  },
  pin: {
    createPin: 'Please enter a 4-digit pin code for future logins.',
    enterPin: 'Please enter your pin code.',
    errorSaving: 'Error saving pin code.',
    continue: 'Continue',
    retype: 'Please re-enter your pin code.',
    mismatch: 'Pin codes do not match.',
  },
  userRequest: {
    enterBudget:
      'Please enter the price for the task you are creating in the field below.',
    success: {
      title: 'Successful',
      message: 'Your request has been successfully created.',
    },
    address: {
      label: 'Address Information',
      from: 'Pickup Location',
      to: 'Drop-off Location',
      edit: 'Edit',
      floor: 'floor',
      unit: 'unit',
    },
    messages: {
      name: {
        required: 'Please enter a name.',
      },
      description: {
        required: 'Please enter a description.',
      },
      files: {
        required: 'Please upload at least 1 image.',
      },
      addresses: {
        required: 'Please enter the addresses.',
      },
      timeRange: {
        required: 'Please enter the date and time.',
      },
    },
  },
  login: {
    title: 'Log in',
    email: {
      tab: 'Email',
      label: 'Email Address',
      placeholder: 'example@email.com',
      errors: {
        required: 'Please enter your email address.',
        validation: 'Please enter a valid email address.',
      },
    },
    or: 'or',
    phone: {
      tab: 'Phone',
      label: 'Phone Number',
      placeholder: '88888888',
      errors: {
        required: 'Please enter your phone number.',
        validation: 'Please enter a valid phone number.',
      },
    },
    socialError: {
      title: 'Error',
      waitPrevious: 'Please wait for your previous request to finish.',
      playServiceUnvailable: 'Please download Play service.',
    },
    check: {
      label: 'Check',
    },
    submit: 'Log in',
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
    title: 'Select Date',
    flexible: 'Flexible schedule',
  },
  emptyRequest: 'You have no requests created.',
  headers: {
    home: 'Home',
    login: 'Log in',
    register: 'Sign up',
    category: 'Types of Services',
    address: 'Select Address',
    request: 'Request',
    taskerProfile: 'Tasker',
    biometric: 'Biometric',
    createPin: 'Create Pin',
    retypePin: 'Retype Pin',
    taskBudget: 'Task Price',
    createOffer: 'Create Offer',
    registrationInformation: 'Registration Information',
    updateInformation: 'Update Information',
    listingDetail: 'Listing details',
  },
  taskBudget: {
    submit: 'Save',
  },
  otp: {
    your: 'Your',
    requestCode: 'Please enter the 4-digit code sent to -',
    resendCode: 'Resend Code',
    resend: 'resend',
  },
  service: {
    name: 'Service Name',
    tag: 'Tag',
    price: 'Service Price',
    timeRange: 'Service Availability',
    online: 'Online',
    inPerson: 'In-person',
    distance: 'Service Radius',
    autoMsg: 'Automatic message',
    success: {
      message: 'Your service has been successfully registered.',
      title: 'Successful',
    },
    category: {
      label: 'Select Service Category',
      category: 'Category',
      subCategory: 'Subcategory',
      searchCategory: 'Search',
    },
    errors: {
      priceEmpty: 'Please enter a service price!',
      priceValid: 'Please enter a valid amount!',
    },
    validation: {
      required: 'This field is required',
      min: 'Must be at least ${min} characters',
      positive: 'Must be a positive number',
      priceRequired: 'Price amount is required',
      priceValid: 'Price amount must be a number',
      tagRequired: 'Tag is required',
      tagMin: 'Tag must be at least 2 characters',
      distanceRequired: 'Service range is required',
      distancePositive: 'Distance must be positive',
      subCategoryRrequired: 'Subcategory is required',
      addressRequired: 'Address for personal service is required',
      nameRequired: 'Service name is required',
      nameMin: 'Name must be at least 3 characters',
      customError: 'Invalid value',
    },
    status: {
      new: 'New!',
    },
    sort: {
      name: 'Sort by',
      priceLowToHigh: 'Price (low to high)',
      priceHighToLow: 'Price (high to low)',
      cancel: 'Cancel',
      default: 'Default',
    },
    onlineService: 'Online service',
  },
};
