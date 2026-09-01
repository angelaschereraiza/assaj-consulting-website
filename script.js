'use strict';

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('#mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

const legalModal = document.querySelector('#legal-modal');
const legalModalTitle = document.querySelector('#modal-title');
const legalModalContent = document.querySelector('#modal-content');

let lastFocusedElement = null;

const LEGAL = {
  imprint: {
    title: 'Impressum',
    content: `
      <h3>Unternehmen</h3>
      <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Schweiz</p>

      <h3>Vertretungsberechtigte Person</h3>
      <p>Andrea M. Jüngling<br>Inhaberin und Geschäftsführerin<br>Eidg. Dipl. Finanz- und Anlageexpertin</p>

      <h3>Kontakt</h3>
      <p>Telefon: <a href="tel:+41795489047">+41 79 548 90 47</a><br>E-Mail: <a href="mailto:juengling@assajconsulting.ch">juengling@assajconsulting.ch</a></p>

      <h3>Handelsregister</h3>
      <p>CHE-291.490.260</p>

      <h3>FINMA-Registrierung</h3>
      <p>Registernummer F01067992</p>

      <h3>Webseite umgesetzt und technisch betreut durch</h3>
      <p>Aiza GmbH<br><a href="https://aiza.ch/" target="_blank" rel="noopener noreferrer">www.aiza.ch</a></p>

      <h3>Haftungsausschluss</h3>
      <p>Die ASSAJ Consulting GmbH übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der auf dieser Website bereitgestellten Inhalte.</p>
      <p>Haftungsansprüche gegen die ASSAJ Consulting GmbH wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung beziehungsweise Nichtnutzung der veröffentlichten Informationen entstanden sind, werden soweit gesetzlich zulässig ausgeschlossen.</p>

      <h3>Externe Links</h3>
      <p>Verweise und Links auf Webseiten Dritter liegen ausserhalb des Verantwortungsbereichs der ASSAJ Consulting GmbH. Für deren Inhalte und Rechtmässigkeit wird keine Verantwortung übernommen.</p>
    `
  },

  privacy: {
    title: 'Datenschutzerklärung',
    content: `
      <h3>Allgemeines</h3>
      <p>Der Schutz Ihrer persönlichen Daten ist der ASSAJ Consulting GmbH wichtig. Personendaten werden vertraulich behandelt und im Rahmen der anwendbaren datenschutzrechtlichen Bestimmungen bearbeitet.</p>

      <h3>Verantwortliche Stelle</h3>
      <p>Verantwortlich für die Datenbearbeitung auf dieser Website ist:</p>
      <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Schweiz</p>
      <p>E-Mail: <a href="mailto:juengling@assajconsulting.ch">juengling@assajconsulting.ch</a><br>Telefon: <a href="tel:+41795489047">+41 79 548 90 47</a></p>

      <h3>Technische Umsetzung und Betreuung</h3>
      <p>Die technische Umsetzung und Betreuung dieser Website erfolgt durch:</p>
      <p>Aiza GmbH<br><a href="https://aiza.ch/" target="_blank" rel="noopener noreferrer">www.aiza.ch</a></p>

      <h3>Server-Logfiles</h3>
      <p>Beim Besuch dieser Website können aus technischen Gründen automatisch Daten in sogenannten Server-Logfiles verarbeitet werden. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten oder Dateien, Browser- und Betriebssysteminformationen sowie Fehlermeldungen gehören.</p>
      <p>Diese Daten dienen der Sicherstellung des technischen Betriebs, der Systemsicherheit sowie der Fehleranalyse.</p>

      <h3>Kontaktaufnahme</h3>
      <p>Wenn Sie die ASSAJ Consulting GmbH per E-Mail oder Telefon kontaktieren, werden die von Ihnen übermittelten Daten zur Bearbeitung und Beantwortung Ihrer Anfrage verwendet.</p>

      <h3>Externe Links</h3>
      <p>Diese Website kann Links zu externen Webseiten enthalten. Beim Aufruf einer solchen Seite verlassen Sie die Website der ASSAJ Consulting GmbH. Für die Bearbeitung personenbezogener Daten auf externen Webseiten ist der jeweilige Anbieter verantwortlich.</p>

      <h3>Weitergabe von Daten</h3>
      <p>Personendaten werden nicht verkauft oder anderweitig an Dritte weitergegeben, sofern keine gesetzliche Verpflichtung besteht oder eine Weitergabe zur Erbringung beziehungsweise technischen Bereitstellung der Website erforderlich ist.</p>

      <h3>Speicherdauer</h3>
      <p>Personendaten werden nur so lange aufbewahrt, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p>

      <h3>Ihre Rechte</h3>
      <p>Sie haben im Rahmen des anwendbaren Datenschutzrechts insbesondere das Recht auf Auskunft über die Bearbeitung Ihrer personenbezogenen Daten sowie, soweit gesetzlich vorgesehen, auf Berichtigung, Löschung oder Einschränkung der Bearbeitung.</p>
      <p>Entsprechende Anfragen können an die oben genannte Kontaktadresse gerichtet werden.</p>

      <h3>Änderungen</h3>
      <p>Die ASSAJ Consulting GmbH behält sich vor, diese Datenschutzerklärung jederzeit anzupassen. Es gilt die jeweils auf dieser Website veröffentlichte Version.</p>
    `
  }
};

function openMenu() {
  if (!hamburger || !mobileMenu) return;

  mobileMenu.hidden = false;
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Menü schliessen');
  document.body.classList.add('menu-open');

  requestAnimationFrame(() => mobileMenu.classList.add('is-open'));
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;

  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Menü öffnen');
  document.body.classList.remove('menu-open');

  window.setTimeout(() => {
    if (!mobileMenu.classList.contains('is-open')) mobileMenu.hidden = true;
  }, 300);
}

hamburger?.addEventListener('click', () => {
  hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
});

mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

function openLegalModal(type) {
  const legalDocument = LEGAL[type];

  if (!legalModal || !legalModalTitle || !legalModalContent || !legalDocument) return;

  lastFocusedElement = document.activeElement;
  legalModalTitle.textContent = legalDocument.title;
  legalModalContent.innerHTML = legalDocument.content;
  legalModal.hidden = false;
  legalModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  requestAnimationFrame(() => {
    legalModal.classList.add('is-open');
    legalModal.querySelector('.modal-close')?.focus();
  });
}

function closeLegalModal() {
  if (!legalModal || legalModal.hidden) return;

  legalModal.classList.remove('is-open');
  legalModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  window.setTimeout(() => {
    if (legalModal.classList.contains('is-open')) return;

    legalModal.hidden = true;
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }, 200);
}

document.querySelectorAll('[data-doc]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    if (link.dataset.doc) openLegalModal(link.dataset.doc);
  });
});

document.querySelectorAll('[data-close]').forEach(element => element.addEventListener('click', closeLegalModal));

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;

  if (legalModal && !legalModal.hidden) {
    closeLegalModal();
    return;
  }

  closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();