import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialInvitationState = {
  title: '우리의 초대장',
  greeting: '함께해주셔서 감사합니다.',
  date: '',
  location: {
    address: '',
    lat: 37.5665, // default Seoul
    lng: 126.9780
  },
  style: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    fontFamily: 'sans-serif'
  },
  images: [] // Array of image URLs
};

export const useInvitationStore = create(
  persist(
    (set) => ({
      data: initialInvitationState,
      
      // Selectors (Actions)
      updateTitle: (title) => set((state) => ({ data: { ...state.data, title } })),
      updateGreeting: (greeting) => set((state) => ({ data: { ...state.data, greeting } })),
      updateDate: (date) => set((state) => ({ data: { ...state.data, date } })),
      
      updateLocation: (location) => set((state) => ({ 
        data: { ...state.data, location: { ...state.data.location, ...location } } 
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
