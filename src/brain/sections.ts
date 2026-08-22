export type SectionId = 'about' | 'skills' | 'projects' | 'experience'

export interface SectionMeta {
  id: SectionId
  label: string
  file: string
  accent: string
  dim: string
  villainLine: string
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'about',
    label: 'ABOUT ME',
    file: 'SUBJECT_01.DAT',
    accent: '#c04dff',
    dim: '#5b2a75',
    villainLine: 'The origin story. Classified, obviously.',
  },
  {
    id: 'skills',
    label: 'SKILLS',
    file: 'ARSENAL.LST',
    accent: '#7fff6b',
    dim: '#2f6630',
    villainLine: 'My arsenal. Handle with care — it took years to assemble.',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    file: 'CREATIONS.CAT',
    accent: '#ffb347',
    dim: '#7a4f1e',
    villainLine: 'Behold my creations, mortal.',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    file: 'ORIGIN.LOG',
    accent: '#b48cff',
    dim: '#533a80',
    villainLine: 'The official record of my ascent. Do try to keep up.',
  },
]

export function sectionMeta(id: SectionId): SectionMeta {
  return SECTIONS.find((s) => s.id === id)!
}

export interface NavLink {
  href: string
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
