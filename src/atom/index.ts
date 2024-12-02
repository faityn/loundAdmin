import {
  AdminMenuType,
  AdminRoleType,
  AdminType,
  AdminUsersType,
  BannerType,
  ConferenceOptionType,
  ConferenceType,
  ExhibitionLecturesType,
  ExhibitionOptionType,
  ExhibitionOrganizerListType,
  ExhibitionRatingListType,
  ExhibitionsApprovedListType,
  ExhibitionType,
  ExhibitionUsersListType,
  FaqType,
  FeedbackRatingDetailType,
  InterestsType,
  LecturesArrayType,
  MenuItem,
  PrivacyType,
  ProfessionType,
  PurposesType,
  SearchOptionsType,
  UserDetailOptionsType,
  UserExhibitionConferenceType,
  UserExhibitionLectureType,
  UserExhibitionListType,
  UserExhibitionRatingType,
  UsersAddExhibitionListType,
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

export const faqListAtom = atom<FaqType[]>({
  key: "faqListAtom",
  default: [],
});

export const faqDetailAtom = atom<FaqType>({
  key: "faqDetailAtom",
  default: {},
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

export const feedBackAllListAtom = atom<ExhibitionsApprovedListType[]>({
  key: "feedBackAllListAtom",
  default: [],
});

export const feedbackDetailAtom = atom<FeedbackRatingDetailType[]>({
  key: "feedbackDetailAtom",
  default: [],
});

export const userExhibitionRatingListAtom = atom<ExhibitionRatingListType[]>({
  key: "userExhibitionRatingListAtom",
  default: [],
});

export const exhibitionUserListAtom = atom<ExhibitionUsersListType[]>({
  key: "exhibitionUserListAtom",
  default: [],
});

export const userDetailAtom = atom<UsersType[]>({
  key: "userDetailAtom",
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

export const adminListAtom = atom<AdminUsersType[]>({
  key: "adminListAtom",
  default: [],
});

export const adminRoleListAtom = atom<AdminRoleType[]>({
  key: "adminRoleListAtom",
  default: [],
});

export const adminMenuListAtom = atom<AdminMenuType[]>({
  key: "adminMenuListAtom",
  default: [],
});

export const adminMenuItemAtom = atom<MenuItem[]>({
  key: "adminMenuItemAtom",
  default: [],
});

export const searchOptionsAtom = atom<SearchOptionsType>({
  key: "searchOptionsAtom",
  default: {},
});
export const optionTypeAtom = atom({
  key: "optionTypeAtom",
  default: "all",
});

export const optionExhibitionAtom = atom({
  key: "optionExhibitionAtom",
  default: "",
});

export const optionStatusAtom = atom({
  key: "optionStatusAtom",
  default: "",
});
export const searchWordAtom = atom({
  key: "searchWordAtom",
  default: "",
});

export const detailOpenAtom = atom({
  key: "detailOpenAtom",
  default: false,
});

export const exhibitionUsersAddModalAtom = atom({
  key: "exhibitionUsersAddModalAtom",
  default: false,
});

export const birthDateAtom = atom({
  key: "birthDateAtom",
  default: "",
});

export const optionRoleAtom = atom({
  key: "optionRoleAtom",
  default: "",
});

export const optionProfessionAtom = atom({
  key: "optionProfessionAtom",
  default: "",
});

export const userDetailOptionsAtom = atom<UserDetailOptionsType>({
  key: "userDetailOptionsAtom",
  default: {},
});

export const checkedInterestAtom = atom<string[]>({
  key: "checkedInterestAtom",
  default: [],
});

export const checkedPurposesAtom = atom<string[]>({
  key: "checkedPurposesAtom",
  default: [],
});

export const userExhibitionListAtom = atom<UserExhibitionListType[]>({
  key: "userExhibitionListAtom",
  default: [],
});

export const usersAddExhibitionListAtom = atom<UsersAddExhibitionListType[]>({
  key: "usersAddExhibitionListAtom",
  default: [],
});

export const userExhibitionLectureAtom = atom<UserExhibitionLectureType[]>({
  key: "userExhibitionLectureAtom",
  default: [],
});

export const userExhibitionConferenceAtom = atom<
  UserExhibitionConferenceType[]
>({
  key: "userExhibitionConferenceAtom",
  default: [],
});

export const userExhibitionConferenceAtomOwn = atom<
  UserExhibitionConferenceType[]
>({
  key: "userExhibitionConferenceAtomOwn",
  default: [],
});

export const userExhibitionRatingAtom = atom<UserExhibitionRatingType>({
  key: "userExhibitionRatingAtom",
  default: {},
});
export const dataSavedAtom = atom({
  key: "dataSavedAtom",
  default: false,
});

export const createExOrganizerOpenAtom = atom({
  key: "createExOrganizerOpenAtom",
  default: false,
});

export const organizerAllListAtom = atom<ExhibitionOrganizerListType[]>({
  key: "organizerAllListAtom",
  default: [],
});

export const organizerDetailAtom = atom<ExhibitionOrganizerListType[]>({
  key: "organizerDetailAtom",
  default: [],
});

export const ActiveRoleAtom = atom({
  key: "ActiveRoleAtom",
  default: "",
});
