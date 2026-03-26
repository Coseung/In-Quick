import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialInvitationState = {
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
    sectionVisibility: {
      greeting: true,
      location: true,
      contact: true,
      gallery: true
    }
  },
  images: [] // Legacy main images, might merge with gallery later
};

export const useInvitationStore = create(
  persist(
    (set) => ({
      data: initialInvitationState,
      
      // Selectors (Actions)
      updateTitle: (title) => set((state) => ({ data: { ...state.data, title } })),
      updateGreeting: (greeting) => set((state) => ({ data: { ...state.data, greeting } })),
      updateNames: (names) => set((state) => ({ data: { ...state.data, names: { ...state.data.names, ...names } } })),
      updateDate: (date) => set((state) => ({ data: { ...state.data, date } })),
      
      updateLocation: (location) => set((state) => ({ 
        data: { ...state.data, location: { ...state.data.location, ...location } } 
      })),
      
      updateContact: (contact) => set((state) => ({
        data: { ...state.data, contact: { ...state.data.contact, ...contact } }
      })),

      updateGallery: (gallery) => set((state) => ({
        data: { ...state.data, gallery: { ...state.data.gallery, ...gallery } }
      })),

      updateSettings: (settings) => set((state) => ({
        data: { ...state.data, settings: { ...state.data.settings, ...settings } }
      })),

      updateStyle: (style) => set((state) => ({
        data: { ...state.data, style: { ...state.data.style, ...style } }
      })),
      
      setImages: (images) => set((state) => ({ data: { ...state.data, images } })),
      addImage: (imageUrl) => set((state) => ({ 
        data: { ...state.data, images: [...state.data.images, imageUrl] } 
      })),
      removeImage: (index) => set((state) => ({
        data: { 
          ...state.data, 
          images: state.data.images.filter((_, i) => i !== index) 
        }
      })),
      
      reset: () => set({ data: initialInvitationState })
    }),
    {
      name: 'in-quick-invitation-storage', // Key for localStorage
    }
  )
);

