export type Registration = {
  created_at: Date
  firstName: string
  lastName: string
  gender: string
  passNo: string
  passExp: string
  phone: string
  whatsapp: string
  email: string
  addr: string
  package: string
  roomType: string
  hasVisa: boolean
  visaCountry: string
  visaAssist: string
  uniqueID: string
  dob: string
}

export type Message = {
  fullName: string
  email: string
  message: string
}

export type Appointment = {
  fullName: string
  phone: string
  email: string
  date: string
  created_at: string
}

export interface CompanyData {
  company_name: string;
  about_us: AboutUs;
  mission: string;
  why_choose_us: WhyChooseUs;
  services: Services;
  start_your_journey: StartYourJourney;
  popular_travel_packages: PopularTravelPackages;
  top_destinations: TopDestinations;
  reviews: Reviews;
}

/* ---------------- ABOUT ---------------- */

export interface AboutUs {
  top: string;
  bottom: string;
}

/* ---------------- WHY CHOOSE US ---------------- */

export interface WhyChooseUs {
  title: string;
  subtitle: string;
  reasons: Reason[];
}

export interface Reason {
  number: number;
  title: string;
  description: string;
}

/* ---------------- SERVICES ---------------- */

export interface Services {
  introduction: string;
  list: ServiceItem[];
}

export interface ServiceItem {
  src: string;
  number: number;
  title: string;
  description: string;
  serv_text: string;
  serv_type: string[];
}

/* ---------------- START JOURNEY ---------------- */

export interface StartYourJourney {
  title: string;
  content: string;
  call_to_action: string;
}

/* ---------------- POPULAR PACKAGES ---------------- */

export interface PopularTravelPackages {
  introduction: string;
  packages: TravelPackages;
}

export interface TravelPackages {
  fifa_world_cup_2026: FifaWorldCupPackage;
  united_states_of_america: CountryPackage;
  united_kingdom: CountryPackage;
  canada: CountryPackage;
  australia: CountryPackage;
}

/* FIFA PACKAGE (special structure) */
export interface FifaWorldCupPackage {
  abreviation: string;
  link: string;
  src: string;
  title: string;
  subtitle: string;
  description: string;
  included: IncludedCategory[];
  why_join: string[];
  who_can_join: string[];
  closing: string;
}

export interface IncludedCategory {
  category: string;
  items: string[];
}

/* Generic country packages */
export interface CountryPackage {
  abreviation: string;
  link: string;
  src: string;
  title: string;
  subtitle: string[];
  description: string;
  packages_include: PackageInclude[];
}

export interface PackageInclude {
  src: string;
  category: string;
  items: string[];
}

/* ---------------- TOP DESTINATIONS ---------------- */

export interface TopDestinations {
  introduction: string;
  destinations: Destinations;
}

export interface Destinations {
  ghana: Destination;
  united_kingdom: Destination;
  united_states_of_america: Destination;
  canada: Destination;
  schengen_states: SchengenDestination;
  australia: Destination;
}

export interface Destination {
  description: string;
  highlights: Highlight[];
}

export interface SchengenDestination extends Destination {
  popular_destinations: string[];
}

export interface Highlight {
  title: string;
  description: string;
}

/* ---------------- REVIEWS ---------------- */

export interface Reviews {
  title: string;
  list: Review[];
}

export interface Review {
  src: string;
  rating: string;
  number: number;
  reviewer: string;
  content: string;
}
