export const initialInvitationState = {
  title: '우리의 초대장',
  greeting: '함께해주셔서 감사합니다.',
  names: {
    groom: '',
    bride: '',
    groomFather: '',
    groomMother: '',
    brideFather: '',
    brideMother: ''
  },
  date: '',
  location: {
    venueName: '',
    address: '',
    lat: 37.5665, // default Seoul
    lng: 126.9780
  },
  contact: {
    accounts: [
      { owner: '신랑', bank: '', number: '' },
      { owner: '신부', bank: '', number: '' }
    ],
    useCopyButton: true
  },
  gallery: {
    images: [],
    type: 'grid' // 'grid' | 'slide'
  },
  style: {
    backgroundColor: '#FAF8F5',
    textColor: '#333333',
    fontFamily: 'Nanum Myeongjo' // Default premium font
  },
  settings: {
    dDayEnabled: true,
    calendarDDayEnabled: true,
    sectionVisibility: {
      greeting: true,
      location: true,
      contact: true,
      gallery: true
    }
  },
  images: [] // Legacy main images
};
