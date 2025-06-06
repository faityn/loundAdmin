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
  company_name?: string;
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
  verifyCode?: number;
  createdAt?: string;
  updatedAt?: string;
  admin?: {
    adminId?: string;
    firstName?: string;
    companyName?: string;
  };
  company?: {
    id?: number;
    name?: string;
  };
};

export type TableOrderDetailType = {
  conferenceId?: number;
  exhibitionTableId?: number;
  exhibition_table_id?: number;
  tableId?: number;
  userId?: number;
  tableNo?: number;
  exhibitionConference?: {
    title?: string;
    start?: string;
    startDate?: string;
    endDate?: string;
    user?: {
      username?: string;
      name?: string;
    };
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
    verifyCode?: number;
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

export type CommunityListType = {
  communityId?: number;
  conferenceId?: number;
  availableMembersCnt?: number;
  title?: string;
  request?: string;
  userId?: number;
  conference?: {
    participationText?: string;
    personCnt?: number;
    participation?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  };
};

export type CommunityManageListType = {
  communityId?: number;
  memberCount?: number;
  title?: string;
  description?: string;
  request?: string;
  userId?: number;
  user?: {
    name?: string;
  };
  communityUsers?: {
    participationText?: string;
    personCnt?: number;
    participation?: string;
  };
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
  company?: {
    name: string;
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
  companyName?: string;
  position?: string;
  phone?: string;
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

export type UserExhibitionTablesType = {
  tableId?: number;
  tableNo?: number;
  personCnt?: number;
  tableAction?: string;
  action?: boolean;
  exhibitionConferenceTable?: [];
};

export type UserExhibitionRatingType = {
  ratingId?: number;
  rating?: number;
  exhibitionId?: number;
  userId?: number;
  comment?: string;
};

export type UserMessageActivityType = {
  userConfInviteCnt?: number;
  userConfRecieveCnt?: number;
  userInviteCnt?: number;
  userMeetInviteCnt?: number;
  userMeetRecieveCnt?: number;
  userRecieveCnt?: number;
};

export type AdminPermittionType = {
  menuId?: number;
  status?: string;
};

export type UserInfoType = {
  userId?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  status?: string;
  password?: string;
};

export type ExhibitionOrganizerListType = {
  id?: number;

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

export type UserReportListType = {
  id?: number;
  userId?: number;
  reportedUserId?: number;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  request?: string;
  description?: string;
  img?: string;
  imgUrl?: string;
  blocker?: {
    imgUrl?: string;
    userId?: number;
    username?: string;
    name?: string;
    img?: string;
    company_name?: string;
  };
  blocked?: {
    imgUrl?: string;
    userId?: number;
    username?: string;
    name?: string;
    img?: string;
    company_name?: string;
  };
};

export type CommunityUsersListType = {
  communityId?: number;
  id?: number;
  title?: string;
  type?: string;
  userId?: number;
  member?: {
    company_name?: string;
    img?: string;
    imgUrl?: string;
    name?: string;
    position?: string;
  };

  user?: {
    company_name?: string;
    img?: string;
    imgUrl?: string;
    name?: string;
    position?: string;
  };
};

export type CompanyListType = {
  id?: number;
  name?: string;

  use: boolean;
};

export type UserCurrentSituationType = {
  age20sRate?: number;
  age30sRate?: number;
  age40sRate?: number;
  age50PlusRate?: number;
  allFemaleUserCount?: number;
  allMaleUserCount?: number;
  allNewUserCount?: number;
  allOrganizer?: number;
  allRecentLoginUserCount?: number;
  allUserCount?: number;
  femaleRate?: number;
  maleRate?: number;
  unknownAgeRate?: number;
  userUsage?: number;
};

export type ExhibitionCurrentSituationType = {
  allDisabledExhibitionCount?: number;
  allExhibitionCount?: number;
  allUserExhibitionCount?: number;
  avgExhibition?: string;
  exhibitionUserConfirmedRate?: number;
};

export type ConferenceCurrentSituationType = {
  allConferenceCount?: number;
  allExhibitionConferenceTableCount?: number;
  approvedConferenceRate?: number;
  tableUsageRate?: number;
};

export type CommunityCurrentSituationType = {
  allApprovedCommunityCount?: number;
  allCommunityCount?: number;
  allCommunityLikeCount?: number;
  allCommunityPostCount?: number;
  allCommunityCommentCount?: number;
  avgCommunityUsers?: number;
};
