import React from 'react';
import { Users, Award, Mail, Phone, MapPin, Calendar, Play, ArrowRight, Github, Linkedin, Twitter, Download, FileText, UserPlus, Facebook, Instagram } from 'lucide-react';
import ContactForm from './components/ContactForm';
import EventsSection from './components/EventsSection';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="/logo-tata-instagram.JPG"
                alt="AI Association Logo"
                className="h-10 w-auto"
              />
              <span className="text-xl font-anton text-black">
                Stowarzyszenie ON.AI
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('events')} className="text-black hover:text-accent-blue transition-colors font-montserrat font-medium">Wydarzenia</button>

              <button onClick={() => scrollToSection('about')} className="text-black hover:text-accent-blue transition-colors font-montserrat font-medium">O nas</button>

              <button onClick={() => scrollToSection('achievements')} className="text-black hover:text-accent-blue transition-colors font-montserrat font-medium">Projekty</button>

              <button onClick={() => scrollToSection('join')} className="text-black hover:text-accent-blue transition-colors font-montserrat font-medium">Dołącz do nas</button>
              <button onClick={() => scrollToSection('contact')} className="text-black hover:text-accent-blue transition-colors font-montserrat font-medium">Kontakt</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in-up">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl mb-6 shadow-sm border border-gray-100">
                <img
                  src="/logo-tata-instagram.JPG"
                  alt="AI Association Logo"
                  className="h-20 w-auto"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-anton text-black mb-6 leading-tight">
              Edukacja w tematyce
              <span className="block text-accent-blue">
                sztucznej inteligencji
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-montserrat font-light">
              Dołącz do ON.AI – stowarzyszenia edukatorów, twórców, technologów i wszystkich, których ciekawi, dokąd zmierza sztuczna inteligencja.
              Wierzymy, że AI powinna być etyczna, dostępna i wspierająca człowieka. Dlatego organizujemy warsztaty, spotkania, wydarzenia kulturalne i treści edukacyjne – dla dzieci, młodzieży i dorosłych.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('join')}
                className="btn-primary inline-flex items-center"
              >
                Dołącz do naszej społeczności
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => scrollToSection('achievements')}
                className="btn-secondary inline-flex items-center"
              >
                Zobacz nasze projekty
              </button>
            </div>
          </div>
        </div>
      </section>
      <EventsSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                src="/logo-tata-instagram.JPG"
                alt="AI Association Logo"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-anton text-black mb-4">O naszym Stowarzyszeniu</h2>
            <div className="text-lg text-gray-700 max-w-3xl mx-auto space-y-4 font-montserrat font-light">
              <p>
                Wierzymy, że sztuczna inteligencja to nie tylko technologia — to narzędzie zmiany społecznej, edukacyjnej i biznesowej.
                Dlatego tworzymy przestrzeń, w której ludzie uczą się, eksperymentują i budują odpowiedzialne rozwiązania oparte na AI.
              </p>
              <p className="font-handwritten text-accent-blue">Naszą misją jest:</p>
              <div className="space-y-2 text-left max-w-2xl mx-auto">
                <p>• upowszechnianie wiedzy o sztucznej inteligencji w sposób zrozumiały i praktyczny,</p>
                <p>• łączenie środowisk naukowych, edukacyjnych i biznesowych,</p>
                <p>• tworzenie projektów, które mają realny wpływ na otoczenie,</p>
                <p>• promowanie etycznego i odpowiedzialnego rozwoju AI.</p>
              </div>
              <p className="font-handwritten text-accent-blue">
                Działamy lokalnie w Szczecinie, ale myślimy globalnie.
                Łączymy ludzi, którzy chcą lecieć na AI — z głową.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <img
                  src="/logo-tata-instagram.JPG"
                  alt="AI Association Logo"
                  className="h-8 w-auto"
                />
              </div>
              <h3 className="text-xl font-anton text-black mb-4">Badania i Innowacyjność</h3>
              <p className="text-gray-700 font-montserrat font-light">
                Wspieramy rozwój techniki, wynalazczości i innowacyjności w różnych obszarach edukacyjnych.
                Popularyzujemy i wdrażamy nowe rozwiązania technologiczne, przeciwdziałając wykluczeniu cyfrowemu.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-accent-blue" />
              </div>
              <h3 className="text-xl font-anton text-black mb-4">Budowanie Społeczności</h3>
              <p className="text-gray-700 font-montserrat font-light">
                Tworzymy warunki do nawiązywania i utrwalania więzi międzyludzkich ponad podziałami.
                Wspieramy współpracę między nauczycielami, uczniami, rodzicami, pasjonatami technologii i instytucjami edukacyjnymi – w kraju i za granicą.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-anton text-black mb-4">Edukacja i Szkolenia</h3>
              <p className="text-gray-700 font-montserrat font-light">
                Prowadzimy działania edukacyjne dla dzieci, młodzieży i dorosłych – w tym szkolenia, kursy i warsztaty z zakresu nowoczesnych technologii, programowania, sztucznej inteligencji oraz kreatywnych metod nauczania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                src="/logo-tata-instagram.JPG"
                alt="AI Association Logo"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-anton text-black mb-4">Nasze projekty</h2>
            <p className="text-lg text-gray-700 font-montserrat font-light">
              Oto przegląd naszych ostatnich projektów, wydarzeń.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <img
                  src="/WhatsApp Image 2025-05-13 at 21.44.01.jpeg"
                  alt="Lecim na AI Szczecin"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-anton text-black mb-2">Lecim na AI Szczecin</h3>
                <p className="text-gray-700 mb-4 font-montserrat font-light text-sm leading-relaxed">
                  Nasze Śniadania o AI to nieformalne spotkania, które łączą ludzi ciekawych nowych technologii z członkami i sympatykami ON.AI.
                  Chcemy się poznawać, integrować i wspólnie odkrywać, co kryje się za hasłami takimi jak machine learning, prompt engineering czy deepfake.
                  Bez stresu. Bez akademickiego tonu. Po prostu – razem rozmawiamy o tym, jak AI działa, do czego może się przydać i co to właściwie znaczy „sztuczna inteligencja w życiu codziennym".
                </p>
                <div className="flex items-center text-sm text-accent-blue font-montserrat">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>2025</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 - Swapped image with Project Card 3 */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <img
                  src="/_GAS6497.jpg"
                  alt="Kulturalnie o AI Event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-anton text-black mb-2">Kulturalnie o AI</h3>
                <p className="text-gray-700 mb-4 font-montserrat font-light text-sm leading-relaxed">
                  Nie boimy się zestawiać ze sobą pozornie odległych światów. Sztuka i technologia? Humor i sztuczna inteligencja? Tak – to właśnie nasze klimaty.
                  Podczas wydarzeń z cyklu Kulturalnie o AI zapraszamy do rozmowy artystów, edukatorów, dziennikarzy i ludzi ciekawych świata. Rozmawiamy o wpływie AI na kulturę, media, muzykę, literaturę i twórczość. Bez strachu, bez zadęcia – z ciekawością i poczuciem humoru.
                  Wierzymy, że sztuczna inteligencja nie jest zarezerwowana dla programistów. Może (i powinna!) być częścią życia każdego z nas – również tych, którzy tworzą, uczą, inspirują.
                </p>
                <div className="flex items-center text-sm text-accent-blue font-montserrat">
                  <Github className="h-4 w-4 mr-1" />
                  <span>Cykliczne wydarzenia</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 - Swapped image with Project Card 2 */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <img
                  src="/1743685905915.jpeg"
                  alt="Debaty i panele"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-anton text-black mb-2">Debaty i panele</h3>
                <p className="text-gray-700 mb-4 font-montserrat font-light text-sm leading-relaxed">
                  Jesteśmy tam, gdzie toczy się dyskusja o przyszłości rynku pracy, edukacji i kompetencji cyfrowych.
                  Bierzemy udział w panelach, debatach i spotkaniach, które pomagają zrozumieć, jak naprawdę działa sztuczna inteligencja – i jak może wspierać ludzi.
                  🗓 Między innymi wzięliśmy udział w Śniadaniu Biznesowym AI: Transformacja kompetencji i przyszłość rynku pracy, organizowanym przez Uniwersytet WSB Merito w Szczecinie.
                  Wspólnie z ekspertami rozmawialiśmy o tym:
                  – czy AI zastąpi człowieka w każdej branży,
                  – jakie kompetencje będą kluczowe w najbliższych latach,
                  – jak realnie wykorzystywać narzędzia AI w codziennej pracy i życiu.
                </p>
                <div className="flex items-center text-sm text-accent-blue font-montserrat">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Debaty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                src="/logo-tata-instagram.JPG"
                alt="AI Association Logo"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-anton text-black mb-4">Dołącz do nas</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-montserrat font-light">
              Zostań członkiem Stowarzyszenia ON.AI i dołącz do społeczności pasjonatów sztucznej inteligencji.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Membership Information */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-anton text-black mb-6 flex items-center">
                <UserPlus className="h-6 w-6 mr-3 text-accent-blue" />
                Członkostwo zwyczajne
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-accent-blue pl-6">
                  <h4 className="text-lg font-montserrat font-semibold text-black mb-2">Korzyści z członkostwa</h4>
                  <p className="text-gray-700 mb-3 font-montserrat font-light">
                    Pełne prawa członkowskie, możliwość uczestnictwa w walnym zgromadzeniu,
                    prawo głosu w sprawach stowarzyszenia.
                  </p>
                  <div className="text-sm text-gray-600 space-y-1 font-montserrat">
                    <p>• Składka członkowska: 50 zł rocznie</p>
                    <p>• Priorytetowy dostęp do warsztatów</p>
                    <p>• Udział w projektach stowarzyszenia</p>
                    <p>• Networking z ekspertami AI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Join */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-anton text-black mb-6">Jak dołączyć?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-blue text-white rounded-full flex items-center justify-center font-montserrat font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-black mb-1">Wypełnij deklarację</h4>
                    <p className="text-gray-700 text-sm font-montserrat font-light">Pobierz i wypełnij deklarację członkowską</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-blue text-white rounded-full flex items-center justify-center font-montserrat font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-black mb-1">Wyślij dokumenty</h4>
                    <p className="text-gray-700 text-sm font-montserrat font-light">Prześlij wypełnioną deklarację na adres stowarzyszenia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-blue text-white rounded-full flex items-center justify-center font-montserrat font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-black mb-1">Otrzymaj potwierdzenie</h4>
                    <p className="text-gray-700 text-sm font-montserrat font-light">Zarząd rozpatrzy wniosek i poinformuje o decyzji</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-blue text-white rounded-full flex items-center justify-center font-montserrat font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-black mb-1">Uiszcz składkę</h4>
                    <p className="text-gray-700 text-sm font-montserrat font-light">Opłać roczną składkę członkowską (50 zł)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Documents Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <h3 className="text-2xl font-anton text-black mb-8 text-center">Dokumenty do pobrania</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Statutes */}
              <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-accent-blue transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-accent-blue" />
                </div>
                <h4 className="text-lg font-montserrat font-semibold text-black mb-2">Statut Stowarzyszenia</h4>
                <p className="text-gray-700 text-sm mb-4 font-montserrat font-light">
                  Poznaj cele, zasady działania i strukturę organizacyjną stowarzyszenia
                </p>
                <a
                  href="https://drive.google.com/file/d/1mJ9HDJq5oenOx8E25Y4o_VYu3Ko6znHg/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-montserrat"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Zobacz statut
                </a>
              </div>

              {/* Member Declaration */}
              <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-black transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-black" />
                </div>
                <h4 className="text-lg font-montserrat font-semibold text-black mb-2">Deklaracja członkowska</h4>
                <p className="text-gray-700 text-sm mb-4 font-montserrat font-light">
                  Formularz dla osób chcących zostać członkami stowarzyszenia
                </p>
                <a
                  href="https://drive.google.com/file/d/1hHgOlAnZYpGrLlxDGvz81QdCt0opVfkG/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-montserrat"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Pobierz PDF
                </a>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-montserrat font-semibold text-black mb-3">Informacje dodatkowe</h4>
              <div className="text-gray-700 space-y-2 text-sm font-montserrat font-light">
                <p>• Wypełnioną deklarację należy przesłać na adres: <strong>biuro@on-ai.pl</strong></p>
                <p>• Składkę członkowską (200 zł rocznie) można uiścić przelewem na konto stowarzyszenia. Dopuszczamy dwie raty.</p>
                <p className="font-montserrat font-medium">72 1090 2268 0000 0001 6098 9486</p>
                <p>Tytuł przelewu: Nazwisko Pierwsza litera imienia Rok składkowy</p>
                <p>• Zarząd rozpatruje wnioski o członkostwo w ciągu 30 dni</p>
                <p>• W przypadku pytań, skontaktuj się z nami przez formularz kontaktowy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                src="/logo-tata-instagram.JPG"
                alt="AI Association Logo"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-anton text-black mb-4">Skontaktuj się z nami</h2>
            <p className="text-lg text-gray-700 font-montserrat font-light">
              Masz pytania? Chcesz nawiązać współpracę? Czekamy na wiadomość od Ciebie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-anton text-black mb-6">Informacje kontaktowe</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-accent-blue" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-black">Email</h4>
                    <p className="text-gray-700 font-montserrat">biuro@on-ai.pl</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent-blue" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-black">Nr telefonu</h4>
                    <p className="text-gray-700 font-montserrat">+48 607 440 740</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent-blue" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-black">Adres</h4>
                    <p className="text-gray-700 font-montserrat">ul. Za wiatrakiem 1C,<br />72-006 Mierzyn</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-montserrat font-semibold text-black mb-4">Obserwuj nas</h4>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/profile.php?id=61572628461771" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent-blue hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/company/stowarzyszenie-on-ai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent-blue hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://www.instagram.com/onai_szczecin?igsh=MXhpaXZqMXBhaDJkcw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent-blue hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-anton text-black mb-6">Wyślij nam wiadomość</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="/logo-tata-instagram copy.JPG"
                alt="ON.AI Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-anton">Stowarzyszenie ON.AI</span>
            </div>
            <div className="text-gray-400 text-center md:text-right font-montserrat">
              <p>&copy; 2025 Stowarzyszenie ON.AI. All rights reserved.</p>
              <p className="text-sm mt-1 font-handwritten">Rozwój sztucznej inteligencji poprzez społeczność i współpracę</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
