export type AdminType = {
  id?: number;
  adminId?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  company?: {
    name?: string;
    title?: string;
  };
  menues?: [
    {
      menuId?: number;
      status?: string;
    }
  ];
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
  link?: string;
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

export type FaqType = {
  faqId?: number;
  answer?: string;
  question?: string;
  status?: string;
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
    }
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
  genderText?: string;
  roleId?: number;
  companyName?: string;
  company_name?: string;
  position?: string;
  status?: string;
  statusText?: string;
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

export type MenuPermissionType = {
  menuId?: number;
  status?: string;
};

export type MenuRoleType = [
  {
    menuId?: number;
    status?: string;
  }
];

export type AdminMenuType = {
  menuId?: number;
  parentId?: number;
  url?: string;
  depth?: number;
  ord?: number;
  iconClass?: string;
  isAdmin?: boolean;
  menu_name?: string;
  status?: string;
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
      status?: string;
    }
  ];
};

export type AdminChildMenuType = [
  {
    menuId?: number;
    parentId?: number;
    url?: string;
    depth?: number;
    ord?: number;
    iconClass?: string;
    isAdmin?: boolean;
    menu_name?: string;
    status?: string;
  }
];

export type MenuItem = {
  menuId: number;
  isUse: boolean;
};

export type SearchOptionsType = {
  search?: [
    {
      value?: string;
      text?: string;
    }
  ];
  status?: [
    {
      value?: string;
      text?: string;
    }
  ];
};

export type UserDetailOptionsType = {
  role?: [
    {
      roleId?: number;
      role_name?: string;
    }
  ];
  profession?: [
    {
      professionId?: number;
      title?: string;
    }
  ];
  status?: [
    {
      value?: string;
      text?: string;
    }
  ];
  gender?: [
    {
      value?: string;
      text?: string;
    }
  ];
};

export type SearchValueType = [
  {
    searchType: string;
    searchWord: string;
    startDate: string;
    endDate: string;
    status: string;
  }
];

export type ExhibitionsApprovedListType = {
  adminId?: number;
  exhibitionId?: number;
  imgUrl?: string;
  statusText?: string;
  startDate?: string;
  endDate?: string;

  status?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  ratingCount?: number;
  admin?: {
    adminId: number;
    firstName: string;
    companyName: string;
  };
};

export type FeedbackRatingDetailType = {
  adminId?: number;
  exhibitionId?: number;
  imgUrl?: string;
  statusText?: string;
  startDate?: string;
  endDate?: string;

  status?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  userCnt?: number;
  userConfirmCnt?: number;
  ratingCnt?: number;
  ratingMax?: number;
  ratingMin?: number;
  admin?: {
    adminId: number;
    firstName: string;
    companyName: string;
  };
};

export type ExhibitionRatingListType = {
  ratingId?: number;
  exhibitionId?: number;
  userId?: number;

  rating?: number;
  comment?: number;
  createdAt?: string;
  updatedAt?: string;

  user?: {
    userId: number;
    imgUrl: string;
    companyName: string;
  };
};

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

export type ExhibitionUsersListType = {
  genderText?: string;
  userId?: number;
  username?: string;
  name?: string;
  email?: string;

  gender?: string;
  recentLogin?: string;
  createdAt?: string;
  exhibition?: [
    {
      isConfirmedText?: string;
      id?: number;
      userId?: number;
      exhibitionId?: number;
      request?: string;
      isConfirmed?: boolean;
    }
  ];
};

export type UsersAddExhibitionListType = {
  exhibitionId?: number;
  title?: string;
  statusText?: string;
  startDate?: string;
  endDate?: string;

  imgUrl?: string;
};

export type UserExhibitionLectureType = {
  lectureId?: number;
  exhibitionId?: number;
  title?: string;
  startDate?: string;
  endDate?: string;
};

export type UserExhibitionConferenceType = {
  conferenceId?: number;
  exhibitionId?: number;
  userId?: number;
  title?: string;
  startDate?: string;
  endDate?: string;
  participationText?: string;
  user?: {
    companyName?: string;
    name?: string;
    position?: string;
    userId?: number;
  };
};

export type UserExhibitionRatingType = {
  ratingId?: number;
  rating?: number;
  exhibitionId?: number;
  userId?: number;
  comment?: string;
};

export type AdminPermittionType = {
  menuId?: number;
  status?: string;
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

export type NoticeType = {
  noticeId?: number;
  status?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};
