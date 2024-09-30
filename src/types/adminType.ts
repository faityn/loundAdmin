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
  id?: number;
  title?: string;
  brand?: string;
  category?: string;
  images?: string[];
  meta?: {
    createdAt?: string;
  };
  created_at?: string;
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
