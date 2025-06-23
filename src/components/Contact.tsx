import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Contact(){
    return (
        <section className="container mx-auto h-screen py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-900/20 to-red-600/20 rounded-xl blur-xl"></div>
                <div className="relative">
                <Image
                    src="/pack.png"
                    width={600}
                    height={400}
                    alt="Caisse Manager POS System"
                    className="rounded-lg ml-10"
                    priority
                />
                </div>
            </div>
            
            <div className=" bg-black/30 p-6 rounded-lg border border-gray-800 mr-10">
                <form className="space-y-4 ">
                <Input
                    type="text"
                    placeholder="Nom de marque*"
                    className="bg-transparent border-gray-700"
                />
                <Input
                    type="tel"
                    placeholder="06xx-xxxxx*"
                    className="bg-transparent border-gray-700"
                />
                <Select>
                    <SelectTrigger className="bg-transparent border-gray-700">
                    <SelectValue placeholder="Ville" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="casablanca">Casablanca</SelectItem>
                    <SelectItem value="rabat">Rabat</SelectItem>
                    <SelectItem value="marrakech">Marrakech</SelectItem>
                    <SelectItem value="tanger">Tanger</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="bg-transparent border-gray-700">
                    <SelectValue placeholder="Type d'activité" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="cafe">Café</SelectItem>
                    <SelectItem value="retail">Commerce de détail</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">
                    Démo GRATUITE
                </Button>
                </form>
            </div>
            </div>
        </section>
    )
}