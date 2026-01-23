import { LucideProps } from "lucide-react";

export interface MenuFeatures {
    title: [string,string,string];
    description: string;
    featureList: string[];
    image: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    iconTitle?: string;
    iconSubTitle?: string;
}