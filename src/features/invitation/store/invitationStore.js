import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialInvitationState } from '../types/invitation.types';

export const useInvitationStore = create(
  persist(
    (set) => ({
      data: initialInvitationState,
      
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
      name: 'in-quick-invitation-storage',
    }
  )
);
