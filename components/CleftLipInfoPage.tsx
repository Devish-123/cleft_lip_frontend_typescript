
import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { RequestCallbackForm } from './RequestCallbackForm';

const dummyArticles = [
    { date: 'Oct 05, 2024', title: 'Navigating Feeding Challenges for Infants with Cleft Lip' },
    { date: 'Sep 28, 2024', title: 'The Surgical Journey: What to Expect from Cleft Lip Repair' },
    { date: 'Sep 21, 2024', title: 'Long-Term Care: Dental and Orthodontic Needs for Children' },
    { date: 'Sep 14, 2024', title: 'Building a Support System: Resources for Families' },
];

interface CleftLipInfoPageProps {
    onExpertOpinionClick: () => void;
}

export const CleftLipInfoPage: React.FC<CleftLipInfoPageProps> = ({ onExpertOpinionClick }) => {
  return (
    <div className="bg-white text-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="mb-8">
                        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
                            <img src="https://bos.org.uk/wp-content/uploads/2022/06/patients_treatments_orthodontics-for-children-teens_cleft-lip-palate_.jpeg" alt="Medical professional examining results" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-start p-8">
                                <h1 className="text-4xl font-extrabold text-white leading-tight">UNDERSTANDING<br/>CLEFT LIP</h1>
                            </div>
                        </div>
                        <article className="prose prose-lg max-w-none text-slate-600">
                            <p>Cleft lip and cleft palate are among the most common birth conditions, affecting thousands of newborns each year. These conditions occur when the tissues of the face and mouth do not fuse properly during early pregnancy. While the appearance of a cleft can be concerning for new parents, it's important to know that these conditions are treatable with excellent outcomes. With a dedicated team of specialists and a clear treatment plan, children with clefts can lead healthy, happy, and fulfilling lives.</p>
                            <p>This guide provides essential information about cleft lip, covering its types, causes, how it's diagnosed, and the available treatment paths. Our goal is to empower families with knowledge and support as they navigate this journey.</p>
                            
                            <h2 className="text-slate-800">What is Cleft Lip?</h2>
                            <p>Cleft lip and cleft palate are birth defects that occur when a baby's lip or mouth do not form properly during pregnancy. A cleft lip is a physical split or separation of the two sides of the upper lip and appears as a narrow opening or gap in the skin of the upper lip. This separation often extends beyond the base of the nose and includes the bones of the upper jaw and/or upper gum.</p>

                            <h2 className="text-slate-800">Types of Cleft Lip</h2>
                            <p>Clefts can vary in severity. A cleft lip can be a small notch in the lip or can be a complete split in the lip that goes up through the nose. It can occur on one side of the lip (unilateral cleft) or on both sides (bilateral cleft).</p>

                            <h2 className="text-slate-800">Causes and Risk Factors</h2>
                            <p>The exact cause of cleft lip is often unknown, but it's believed to be a combination of genetic and environmental factors. A family history of the condition can increase the risk. Certain environmental factors during pregnancy, such as smoking, alcohol consumption, and some medications, may also play a role.</p>

                            <h2 className="text-slate-800">Diagnosis</h2>
                            <p>Cleft lip is often diagnosed during a routine prenatal ultrasound. If it's not detected before birth, it is immediately identifiable when the baby is born. A physical examination of the baby's mouth, nose, and palate confirms the diagnosis.</p>

                            <h2 className="text-slate-800">Treatment</h2>
                            <p>Treatment for cleft lip typically involves surgery to close the separation. The first surgery is usually performed within the first few months of a baby's life. Depending on the severity, additional surgeries may be needed as the child grows. A comprehensive care team often includes surgeons, pediatricians, orthodontists, and speech therapists to address all aspects of the child's health and development.</p>
                        </article>
                    </div>
                </div>

                {/* Sidebar */}
                <aside>
                    <div className="sticky top-28">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8">
                            <button onClick={onExpertOpinionClick} className="w-full mb-4 flex justify-between items-center text-left py-3 px-5 border-2 border-slate-800 text-slate-800 font-bold rounded-full hover:bg-slate-100 transition-all">
                                <span>GET EXPERT OPINION</span>
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                            <a 
                                href="https://chat.whatsapp.com/JDWUlQENWpHEga5tXPxnYl" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full flex justify-between items-center text-left py-3 px-5 bg-apollo-gold text-slate-800 font-bold rounded-full hover:bg-amber-400/90 transition-all"
                            >
                                <span>CONTACT US</span>
                                <PhoneIcon className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="space-y-6">
                            {dummyArticles.map((article, index) => (
                                <a key={index} href="#" className="block group">
                                    <p className="text-sm text-slate-500 mb-1">{article.date}</p>

                                    <h4 className="font-semibold text-slate-800 group-hover:text-apollo-teal transition">{article.title}</h4>
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
        <RequestCallbackForm />
    </div>
  );
};
