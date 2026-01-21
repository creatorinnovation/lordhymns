import React, { useState, useEffect, useCallback } from 'react';
import {
  Music,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import Logo from '../components/Logo';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="space-y-4">
                        <Logo color="text-white"/>
                        <p className="text-sm text-zinc-400">
                            Lord Hymns Music Institute is dedicated to providing high-quality music education to students of all ages.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-blue-500 transition-colors" aria-label="फेसबुक"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-pink-500 transition-colors" aria-label="इंस्टाग्राम"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-red-500 transition-colors" aria-label="यूट्यूब"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Link</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#about" className="hover:text-blue-500 transition-colors">About Us</a></li>
                            <li><a href="#courses" className="hover:text-blue-500 transition-colors">Our Courses</a></li>
                            <li><a href="#faculty" className="hover:text-blue-500 transition-colors">Faculty</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Events</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Syllabus</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#piano" className="hover:text-blue-500 transition-colors">Piano & Keyboard</a></li>
                            <li><a href="#guitar" className="hover:text-blue-500 transition-colors">Guitar (Acoustic/Electric)</a></li>
                            <li><a href="#drums" className="hover:text-blue-500 transition-colors">drums</a></li>
                            <li><a href="#vocals" className="hover:text-blue-500 transition-colors">Vocal (Indian/Western)</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>123 Indira Service Station,<br />Najafgarh, INDIA 110043</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>+91 9999999999</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>info@lordhymns.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} Lord Hymns. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer