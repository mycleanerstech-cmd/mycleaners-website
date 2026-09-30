import type { SVGProps } from "react";
import {
  ArrowRight as LucideArrowRight,
  Bell as LucideBell,
  Building2 as LucideBuilding2,
  Calendar as LucideCalendar,
  Check as LucideCheck,
  ChevronLeft as LucideChevronLeft,
  ChevronDown as LucideChevronDown,
  ChevronRight as LucideChevronRight,
  Clock3 as LucideClock,
  Download as LucideDownload,
  Eye as LucideEye,
  Heart as LucideHeart,
  House as LucideHome,
  IndianRupee as LucideIndianRupee,
  Landmark as LucideLandmark,
  LayoutGrid as LucideLayoutGrid,
  Leaf as LucideLeaf,
  Mail as LucideMail,
  MapPin as LucideMapPin,
  Menu as LucideMenu,
  Phone as LucidePhone,
  Shield as LucideShield,
  Smartphone as LucideSmartphone,
  Sparkles as LucideSparkles,
  Star as LucideStar,
  Shirt as LucideShirt,
  Truck as LucideTruck,
  WashingMachine as LucideWashingMachine,
  X as LucideX,
} from "lucide-react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height" | "strokeWidth"> & {
  size?: number;
  strokeWidth?: number;
};

/* ─── Navigation / UI ──────────────────────────────────────────── */
export const MenuIcon = (props: IconProps) => <LucideMenu {...props} />;
export const CloseIcon = (props: IconProps) => <LucideX {...props} />;
export const ChevronLeftIcon = (props: IconProps) => <LucideChevronLeft {...props} />;
export const ChevronDownIcon = (props: IconProps) => <LucideChevronDown {...props} />;
export const ChevronRightIcon = (props: IconProps) => <LucideChevronRight {...props} />;
export const ArrowRightIcon = (props: IconProps) => <LucideArrowRight {...props} />;

/* ─── Contact / Communication ──────────────────────────────────── */
export const PhoneIcon = (props: IconProps) => <LucidePhone {...props} />;
export const MailIcon = (props: IconProps) => <LucideMail {...props} />;
export const MapPinIcon = (props: IconProps) => <LucideMapPin {...props} />;
export const LandmarkIcon = (props: IconProps) => <LucideLandmark {...props} />;
export const BuildingIcon = (props: IconProps) => <LucideBuilding2 {...props} />;

export function LinkedinIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ─── Brand / Social ───────────────────────────────────────────── */
export function WhatsAppIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function TwitterXIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.261 5.631 5.903-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── Feature / Service Icons ───────────────────────────────────── */
export function StarIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return <LucideStar fill={filled ? "currentColor" : "none"} strokeWidth={filled ? 0 : props.strokeWidth} {...props} />;
}

export const CheckIcon = (props: IconProps) => <LucideCheck {...props} />;
export const ClockIcon = (props: IconProps) => <LucideClock {...props} />;
export const ShieldIcon = (props: IconProps) => <LucideShield {...props} />;
export const LeafIcon = (props: IconProps) => <LucideLeaf {...props} />;
export const HeartIcon = (props: IconProps) => <LucideHeart {...props} />;
export const SparkleIcon = (props: IconProps) => <LucideSparkles {...props} />;
export const TruckIcon = (props: IconProps) => <LucideTruck {...props} />;
export const HomeIcon = (props: IconProps) => <LucideHome {...props} />;
export const MobileIcon = (props: IconProps) => <LucideSmartphone {...props} />;
export const EyeIcon = (props: IconProps) => <LucideEye {...props} />;
export const RupeeIcon = (props: IconProps) => <LucideIndianRupee {...props} />;
export const DownloadIcon = (props: IconProps) => <LucideDownload {...props} />;
export const CalendarIcon = (props: IconProps) => <LucideCalendar {...props} />;
export const GridIcon = (props: IconProps) => <LucideLayoutGrid {...props} />;
export const BellIcon = (props: IconProps) => <LucideBell {...props} />;
export const ShirtIcon = (props: IconProps) => <LucideShirt {...props} />;
export const WashingMachineIcon = (props: IconProps) => <LucideWashingMachine {...props} />;

export function QuoteIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z" />
    </svg>
  );
}
