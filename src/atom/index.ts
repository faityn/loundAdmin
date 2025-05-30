import {
  AdminMenuType,
  AdminPermittionType,
  AdminRoleType,
  AdminType,
  AdminUsersType,
  BannerType,
  CommunityCurrentSituationType,
  CommunityListType,
  CommunityManageListType,
  CommunityUsersListType,
  CompanyListType,
  ConferenceCurrentSituationType,
  ConferenceOptionType,
  ConferenceType,
  ExhibitionCurrentSituationType,
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
  MenuPermissionType,
  NoticeType,
  PrivacyType,
  ProfessionType,
  PurposesType,
  SearchOptionsType,
  TableOrderDetailType,
  UserCurrentSituationType,
  UserDetailOptionsType,
  UserExhibitionConferenceType,
  UserExhibitionLectureType,
  UserExhibitionListType,
  UserExhibitionRatingType,
  UserExhibitionTablesType,
  UserMessageActivityType,
  UserReportListType,
  UsersAddExhibitionListType,
  UsersType,
} from "@/types/adminType";

import { atom } from "recoil";

export const adminAllListAtom = atom<AdminType[]>({
  key: "admin_list_atom",
  default: [],
});

export const adminDetailAtom = atom<AdminType>({
  key: "adminDetailAtom",
  default: {},
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

export const pageLimitAtom = atom<string>({
  key: "pageLimitAtom",
  default: "10",
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

export const tableOrderDetailAtom = atom<TableOrderDetailType[]>({
  key: "tableOrderDetailAtom",
  default: [],
});

export const tableNumberAtom = atom({
  key: "tableNumberAtom",
  default: 0,
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

export const communityListAtom = atom<CommunityListType[]>({
  key: "communityListAtom",
  default: [],
});

export const communityDetailAtom = atom<CommunityListType>({
  key: "communityDetailAtom",
  default: {},
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

export const menuPermissionAtom = atom<MenuPermissionType>({
  key: "menuPermissionAtom",
  default: {},
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

export const optionCompanyAtom = atom({
  key: "optionCompanyAtom",
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

export const communityDetailOpenAtom = atom({
  key: "communityDetailOpenAtom",
  default: false,
});

export const exhibitionUsersAddModalAtom = atom({
  key: "exhibitionUsersAddModalAtom",
  default: false,
});

export const exhibitionUsersBulkUploadModalAtom = atom({
  key: "exhibitionUsersBulkUploadModalAtom",
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

export const userExhibitionTablesAtom = atom<UserExhibitionTablesType[]>({
  key: "userExhibitionTablesAtom",
  default: [],
});

export const userExhibitionRatingAtom = atom<UserExhibitionRatingType>({
  key: "userExhibitionRatingAtom",
  default: {},
});
export const userMessageActivityAtom = atom<UserMessageActivityType>({
  key: "userMessageActivityAtom",
  default: {},
});

export const dataSavedAtom = atom({
  key: "dataSavedAtom",
  default: false,
});
export const adminPermittionAtom = atom<AdminPermittionType[]>({
  key: "adminPermittionAtom",
  default: [],
});
export const createExOrganizerOpenAtom = atom({
  key: "createExOrganizerOpenAtom",
  default: false,
});

export const organizerAllListAtom = atom<ExhibitionOrganizerListType[]>({
  key: "organizerAllListAtom",
  default: [],
});

export const organizerDetailAtom = atom<CompanyListType[]>({
  key: "organizerDetailAtom",
  default: [],
});

export const createAdminOpenAtom = atom({
  key: "createAdminOpenAtom",
  default: false,
});

export const menuAllListAtom = atom<AdminMenuType[]>({
  key: "menuAllListAtom",
  default: [],
});

export const adminShowMenuAtom = atom<AdminMenuType[]>({
  key: "adminShowMenuAtom",
  default: [],
});

export const subMenuListAtom = atom<AdminMenuType[]>({
  key: "subMenuListAtom",
  default: [],
});

export const ActiveRoleAtom = atom({
  key: "ActiveRoleAtom",
  default: "",
});

export const noticeListAtom = atom<NoticeType[]>({
  key: "noticeListAtom",
  default: [],
});

export const noticeDetailAtom = atom<NoticeType[]>({
  key: "noticeDetailAtom",
  default: [],
});

export const userReportListAtom = atom<UserReportListType[]>({
  key: "userReportListAtom",
  default: [],
});

export const userReportDetailAtom = atom<UserReportListType>({
  key: "userReportDetailAtom",
  default: {},
});

export const communityManageListAtom = atom<CommunityManageListType[]>({
  key: "communityManageListAtom",
  default: [],
});

export const communityManageDetailAtom = atom<CommunityManageListType>({
  key: "communityManageDetailAtom",
  default: {},
});

export const communityUsersAtom = atom<CommunityUsersListType[]>({
  key: "communityUsersAtom",
  default: [],
});

export const companyListAtom = atom<CompanyListType[]>({
  key: "companyListAtom",
  default: [],
});

export const userCurrentSituationAtom = atom<UserCurrentSituationType>({
  key: "user_current_situation_atom",
  default: {},
});

export const exhibitionCurrentSituationAtom = atom<ExhibitionCurrentSituationType>({
  key: "exhibition_current_situation_atom",
  default: {},
});

export const conferenceCurrentSituationAtom = atom<ConferenceCurrentSituationType>({
  key: "admin_conference_current_situation_atom",
  default: {},
});

export const communityCurrentSituationAtom = atom<CommunityCurrentSituationType>({
  key: "community_current_situation_atom",
  default: {},
});
