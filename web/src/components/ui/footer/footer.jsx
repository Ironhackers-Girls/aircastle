function Footer() {
    return (
      <footer className="bg-[var(--soft-gray)] text-[var(--black)] border-t border-[var(--light-gray)]">
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-10">
  
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
  
            <div>
              <h3 className="mb-4 font-semibold text-sm md:text-base">Support</h3>
              <ul className="space-y-2 text-sm text-[var(--dark-gray)]">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">AirCover</a></li>
                <li><a href="#" className="hover:underline">Payment Options</a></li>
                <li><a href="#" className="hover:underline">Refunds</a></li>
              </ul>
            </div>
  
            <div>
              <h3 className="mb-4 font-semibold text-sm md:text-base">Hosting Center</h3>
              <ul className="space-y-2 text-sm text-[var(--dark-gray)]">
                <li><a href="#" className="hover:underline">Host Your Space</a></li>
                <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
                <li><a href="#" className="hover:underline">Host Resources</a></li>
                <li><a href="#" className="hover:underline">Responsible Hosting</a></li>
              </ul>
            </div>
  
            <div>
              <h3 className="mb-4 font-semibold text-sm md:text-base">Airbnb</h3>
              <ul className="space-y-2 text-sm text-[var(--dark-gray)]">
                <li><a href="#" className="hover:underline">Newsroom</a></li>
                <li><a href="#" className="hover:underline">Investors</a></li>
                <li><a href="#" className="hover:underline">Jobs</a></li>
                <li><a href="#" className="hover:underline">Engineering Blog</a></li>
              </ul>
            </div>
  
            <div>
              <h3 className="mb-4 font-semibold text-sm md:text-base">Resources</h3>
              <ul className="space-y-2 text-sm text-[var(--dark-gray)]">
                <li><a href="#" className="hover:underline">Trust & Safety</a></li>
                <li><a href="#" className="hover:underline">Accessibility</a></li>
                <li><a href="#" className="hover:underline">Airbnb.org</a></li>
                <li><a href="#" className="hover:underline">Invite Friends</a></li>
              </ul>
            </div>
  
            <div>
              <h3 className="mb-4 font-semibold text-sm md:text-base">Legal</h3>
              <ul className="space-y-2 text-sm text-[var(--dark-gray)]">
                <li><a href="#" className="hover:underline">Terms</a></li>
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Policies</a></li>
                <li><a href="#" className="hover:underline">Site Map</a></li>
              </ul>
            </div>
          </div>
  
          <hr className="border-[var(--light-gray)] mb-6" />
  
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 text-sm text-[var(--dark-gray)]">
            <div>
              © 2023 <span className="font-semibold">AirCastle™</span>. 
            </div>
            <div>
              This project was created as part of the{" "}
              <span className="font-semibold"> Ironhack Web Development Bootcamp. </span>
            </div>
            <div>
              All product rights belong to{" "}
              <span className="font-semibold">Airbnb</span>.
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
