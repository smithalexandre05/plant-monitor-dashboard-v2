import { Clock, Droplets, CircleCheck, Hourglass, Waves, Sun, Lightbulb, Moon, Leaf, Thermometer, Droplet, TriangleAlert } from 'lucide-react';

export default function SysLogStatCard({ bgColor, borderColor, icon, titleColor, title, message}) {

    const iconMap = {
        Clock: <Clock size={23} strokeWidth={1.5} />,
        Droplets: <Droplets size={23} strokeWidth={1.5} />,
        CircleCheck: <CircleCheck size={23} strokeWidth={1.5} />,
        Hourglass: <Hourglass size={23} strokeWidth={1.5} />,
        Waves: <Waves size={23} strokeWidth={1.5} />,
        Sun: <Sun size={23} strokeWidth={1.5} />,
        Lightbulb: <Lightbulb size={23} strokeWidth={1.5} />,
        Moon: <Moon size={23} strokeWidth={1.5} />,
        Leaf: <Leaf size={23} strokeWidth={1.5} />,
        Thermometer: <Thermometer size={23} strokeWidth={1.5} />,
        Droplet: <Droplet size={23} strokeWidth={1.5} />,
        TriangleAlert: <TriangleAlert size={23} strokeWidth={1.5} />,
    };

    return (
        <div className={`p-6 h-30 w-1/3 border-1 w-full rounded-2xl ${bgColor} ${borderColor}`}>
            <div className={`flex justify-start items-center gap-2 font-bold text-sm ${titleColor}`}>
                <div>{iconMap[icon]}</div>
                <h2>{title}</h2>
            </div>
            <div className='pt-4'>
                <p className='text-sm text-[#c4c4cc]'>{message}</p>
            </div>
        </div>
    )
}