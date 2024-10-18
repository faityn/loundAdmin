export type AdminType = {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  company?: {
    name?: string;
    title?: string;
  };
  role?: string;
  image?: string;
  created_at?: string;
};

export type ExhibitionType = {
  exhibitionId?: number;
  adminId?: string;
  title?: string;
  statusText?: string;
  short_desc?: string;
  imgUrl?: string;
  img?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  admin?: {
    adminId?: string;
    firstName?: string;
    companyName?: string;
  };
};

export type BannerType = {
  id?: number;
  title?: string;
  img?: string;
  imgUrl?: string;
  ord?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type InterestsType = {
  interestId?: number;
  title?: string;
};

export type PurposesType = {
  purposeId?: number;
  title?: string;
};

export type ProfessionType = {
  professionId?: number;
  title?: string;
};

export type PrivacyType = {
  id?: number;
  title?: string;
  slug?: string;
  status?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ExhibitionOptionType = {
  interest?: [{ interestId: number; title: string }];
  purpose?: [{ purposeId: number; title: string }];
  status?: [
    {
      value: string;
      text: string;
    },
  ];
  content?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LecturesArrayType = {
  title?: string;
  short_desc?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  imgIndex?: number;
};

export type ExhibitionLecturesType = {
  imgUrl?: string;
  lectureId?: number;
  exhibitionId?: number;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  short_desc?: string;
  exhibition?: {
    title: string;
  };
};

export type UsersType = {
  userId?: number;
  imgUrl?: string;
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  description: string;
  professionId: number;
  birthday?: string;
  isForeigner?: boolean;
  img?: string;
  gender?: string;
  roleId?: number;
  companyName?: string;
  position?: string;
  status?: string;
  recentLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  role?: {
    roleId?: number;
    createdAt?: string;
    updatedAt?: string;
    role_name?: string;
  };
  profession?: string;
};

export type ConferenceType = {
  conferenceId?: number;
  description?: string;
  exhibitionId?: number;
  exhibition?: ExhibitionType;
  title?: string;
  isStopRegister?: boolean;
  imgUrl?: string;
  img?: string;
  participation?: string;
  personCnt?: number;
  request: string;
  start?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    companyName?: string;
    img?: string;
    imgUrl?: string;
    name?: string;
    position?: string;
    userId?: number;
  };
  userId?: number;
};

export type ConferenceOptionType = {
  value: string;
  text: string;
};

export type AdminUsersType = {
  adminId?: number;
  roleId?: number;
  img?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  isSuper?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminRoleType = {
  roleId?: number;
  role_name?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminMenuType = {
  menuId?: number;
  parentId?: number;
  url?: string;
  depth?: number;
  ord?: number;
  iconClass?: string;
  isAdmin?: boolean;
  menu_name?: string;
  children?: [
    {
      menuId?: number;
      parentId?: number;
      url?: string;
      depth?: number;
      ord?: number;
      iconClass?: string;
      isAdmin?: boolean;
      menu_name?: string;
    },
  ];
};

export type MenuItem = {
  menuId: number;
  isUse: boolean;
};

export type SearchOptionsType = {
  search?: [
    {
      value?: string;
      text?: string;
    },
  ];
  status?: [
    {
      value?: string;
      text?: string;
    },
  ];
};

export type UserDetailOptionsType = {
  role?: [
    {
      roleId?: number;
      role_name?: string;
    },
  ];
  profession?: [
    {
      professionId?: number;
      title?: string;
    },
  ];
  status?: [
    {
      value?: string;
      text?: string;
    },
  ];
  gender?: [
    {
      value?: string;
      text?: string;
    },
  ];
};

export type SearchValueType = [
  {
    searchType: string;
    searchWord: string;
    startDate: string;
    endDate: string;
    status: string;
  },
];

export type UserExhibitionListType = {
  id?: number;
  userId?: number;
  exhibitionId?: number;
  request?: string;
  dates?: string;
  createdAt?: string;
  updatedAt?: string;

  exhibition?: ExhibitionType;
};

export type UserExhibitionRatingType = {
  total?: number;
  avarage?: number;
  max?: number;
  min?: number;
  rows?: [];
};

export type UserInfoType = {
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  status?: string;
  password?: string;
};

export type ExhibitionOrganizerListType = {
  adminId?: number;
  statusText?: string;
  username?: string;
  firstName?: string;
  companyName?: string;
  phone?: string;
  email: string;
  status?: string;
  createdAt?: string;
};
