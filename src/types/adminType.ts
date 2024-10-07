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
  short_desc?: string;
  imgUrl?: string;
  img?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
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

  birthday?: string;
  isForeigner?: boolean;
  img?: string;
  gender?: string;
  roleId?: number;
  companyName?: string;
  position?: string;
  status?: string;
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
