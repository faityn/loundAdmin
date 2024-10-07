import {
  AdminType,
  BannerType,
  ConferenceOptionType,
  ConferenceType,
  ExhibitionLecturesType,
  ExhibitionOptionType,
  ExhibitionType,
  InterestsType,
  LecturesArrayType,
  PrivacyType,
  ProfessionType,
  PurposesType,
  UsersType,
} from "@/types/adminType";

import { atom } from "recoil";

export const adminAllListAtom = atom<AdminType[]>({
  key: "admin_list_atom",
  default: [],
});

export const exhibitionListAtom = atom<ExhibitionType[]>({
  key: "exhibition_list_atom",
  default: [],
});

export const exhibitionDetailAtom = atom<ExhibitionType[]>({
  key: "exhibitionDetailAtom",
  default: [],
});

export const checkedListAtom = atom<string[]>({
  key: "checked_list_atom",
  default: [],
});

export const checkedInterestsListAtom = atom<string[]>({
  key: "checkedInterestsListAtom",
  default: [],
});

export const checkedPurposesListAtom = atom<string[]>({
  key: "checkedPurposesListAtom",
  default: [],
});

export const selectedOptionAtom = atom<string>({
  key: "selected_option_atom",
  default: "",
});

export const totalPageAtom = atom<number>({
  key: "total_page_atom",
  default: 1,
});

export const startDateAtom = atom<string>({
  key: "start_date_atom",
  default: "",
});

export const endDateAtom = atom<string>({
  key: "end_date_atom",
  default: "",
});

export const fileAtom = atom<File | null>({
  key: "file_atom",
  default: null, // This sets the initial state to null
});

export const adminRoleAtom = atom<string>({
  key: "adminRoleAtom",
  default: "",
});

export const bannerListAtom = atom<BannerType[]>({
  key: "bannerListAtom",
  default: [],
});

export const bannerDetailAtom = atom<BannerType[]>({
  key: "bannerDetailAtom",
  default: [],
});

export const interestsListAtom = atom<InterestsType[]>({
  key: "interestsListAtom",
  default: [],
});

export const interestDetailAtom = atom<InterestsType[]>({
  key: "interestDetailAtom",
  default: [],
});

export const purposesListAtom = atom<PurposesType[]>({
  key: "purposesListAtom",
  default: [],
});

export const purposesDetailAtom = atom<PurposesType[]>({
  key: "purposesDetailAtom",
  default: [],
});

export const professionListAtom = atom<ProfessionType[]>({
  key: "professionListAtom",
  default: [],
});

export const professionDetailAtom = atom<ProfessionType[]>({
  key: "professionDetailAtom",
  default: [],
});

export const privacyListAtom = atom<PrivacyType[]>({
  key: "privacyListAtom",
  default: [],
});

export const privacyDetailAtom = atom<PrivacyType[]>({
  key: "privacyDetailAtom",
  default: [],
});

export const exhibitionOptionAtom = atom<ExhibitionOptionType[]>({
  key: "exhibitionOptionAtom",
  default: [],
});

export const lecturesArrayAtom = atom<LecturesArrayType[]>({
  key: "lecturesArrayAtom",
  default: [],
});

export const exhibitionLecturesAtom = atom<ExhibitionLecturesType[]>({
  key: "exhibitionLecturesAtom",
  default: [],
});

export const exhibitionAllAtom = atom<ExhibitionType[]>({
  key: "exhibitionAllAtom",
  default: [],
});

export const userAllListAtom = atom<UsersType[]>({
  key: "userAllListAtom",
  default: [],
});

export const conferencesListAtom = atom<ConferenceType[]>({
  key: "conferencesListAtom",
  default: [],
});

export const conferencesDetailAtom = atom<ConferenceType[]>({
  key: "conferencesDetailAtom",
  default: [],
});

export const conferenceOptionAtom = atom<ConferenceOptionType[]>({
  key: "conferenceOptionAtom",
  default: [],
});
