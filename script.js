'use strict';

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('#mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const legalModal = document.querySelector('#legal-modal');
const legalModalTitle = document.querySelector('#modal-title');
const legalModalContent = document.querySelector('#modal-content');
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');

let lastFocusedElement = null;
let currentLegalDocument = null;

const TRANSLATIONS = {
  de: {
    htmlLang: 'de-CH',
    locale: 'de_CH',
    title: 'ASSAJ Consulting GmbH | Versicherungslösungen & Vorsorge',
    description: 'ASSAJ Consulting GmbH in Birsfelden: persönliche Beratung für individuelle Versicherungs-, Vorsorge- und Absicherungslösungen.',
    skip: 'Zum Hauptinhalt springen',
    navServices: 'Dienstleistungen',
    navAbout: 'Über mich',
    navContact: 'Kontakt',
    heroTitle: 'Persönliche Beratung für individuelle <span>Ver&shy;siche&shy;rungs&shy;lösungen</span>',
    heroLead: 'Gemeinsam erarbeiten wir massgeschneiderte Vorsorge- und Absicherungslösungen, die zu Ihrer persönlichen oder unternehmerischen Situation passen.',
    contactButton: 'Kontakt aufnehmen',
    moreButton: 'Mehr erfahren',
    servicesEyebrow: 'Dienstleistungen',
    servicesTitle: 'Consulting im umfassenden Feld für Versicherungslösungen',
    servicesIntro: 'Fundiertes Fachwissen und langjährige Erfahrung in der Finanz- und Versicherungsbranche bilden die Grundlage für eine auf Ihre Bedürfnisse abgestimmte Beratung.',
    serviceInsurance: 'Versicherungslösungen',
    serviceInsuranceText: 'Persönliche Beratung bei unterschiedlichsten Versicherungsfragen und gemeinsame Erarbeitung passender Lösungen.',
    servicePension: 'Vorsorge',
    servicePensionText: 'Individuelle Vorsorgelösungen, die Ihre persönliche Situation und Ihre langfristigen Bedürfnisse berücksichtigen.',
    serviceProtection: 'Absicherung',
    serviceProtectionText: 'Massgeschneiderte Absicherungslösungen für Ihre persönliche oder unternehmerische Situation.',
    serviceClaims: 'Begleitung im Schadenfall',
    serviceClaimsText: 'Im Schadenfall begleite ich Sie als Bindeglied zwischen Versicherungsunternehmen und Versicherten und agiere in Ihrem Interesse.',
    aboutEyebrow: 'Über mich',
    aboutTitle: 'Persönlich. Kompetent. An Ihrer Seite.',
    aboutLead: 'Als Inhaberin und Geschäftsführerin der ASSAJ Consulting GmbH stehe ich Ihnen mit fundiertem Fachwissen in diversen Bereichen des Versicherungswesens gerne zur Seite.',
    aboutText: 'Dank meiner langjährigen Erfahrung in der Finanz- und Versicherungsbranche begleite ich Sie bei unterschiedlichsten Versicherungsfragen und erarbeite gemeinsam mit Ihnen passende Vorsorge- und Absicherungslösungen.',
    qualification: 'Qualifikation',
    qualificationText: 'Finanz- und Anlageexpertin mit eidg. Diplom',
    portraitAlt: 'Andrea M. Jüngling, Inhaberin der ASSAJ Consulting GmbH',
    contactEyebrow: 'Kontakt',
    contactTitle: 'Lassen Sie uns ins Gespräch kommen.',
    contactIntro: 'Haben Sie Fragen zu Ihrer Versicherungssituation oder möchten Sie eine persönliche Beratung? Ich freue mich auf Ihre Kontaktaufnahme.',
    address: 'Adresse',
    phone: 'Telefon',
    email: 'E-Mail',
    commercialRegister: 'Handelsregister',
    finma: 'FINMA-Registrierung',
    emailButton: 'E-Mail schreiben',
    websiteBy: 'Webseite von',
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schliessen',
    modalClose: 'Schliessen'
  },

  fr: {
    htmlLang: 'fr-CH',
    locale: 'fr_CH',
    title: 'ASSAJ Consulting GmbH | Assurances & prévoyance',
    description: 'ASSAJ Consulting GmbH à Birsfelden : conseil personnalisé en matière d’assurances, de prévoyance et de protection.',
    skip: 'Aller au contenu principal',
    navServices: 'Services',
    navAbout: 'À propos',
    navContact: 'Contact',
    heroTitle: 'Conseil personnelle pour des <span>solutions d’assurance individuelles</span>',
    heroLead: 'Ensemble, nous élaborons des solutions de prévoyance et de protection sur mesure, adaptées à votre situation personnelle ou professionnelle.',
    contactButton: 'Prendre contact',
    moreButton: 'En savoir plus',
    servicesEyebrow: 'Services',
    servicesTitle: 'Conseil global en matière de solutions d’assurance',
    servicesIntro: 'Une expertise approfondie et de nombreuses années d’expérience dans les secteurs de la finance et de l’assurance constituent la base d’un conseil adapté à vos besoins.',
    serviceInsurance: 'Solutions d’assurance',
    serviceInsuranceText: 'Conseil personnalisé pour différentes questions d’assurance et élaboration commune de solutions adaptées.',
    servicePension: 'Prévoyance',
    servicePensionText: 'Des solutions de prévoyance individuelles qui tiennent compte de votre situation personnelle et de vos besoins à long terme.',
    serviceProtection: 'Protection',
    serviceProtectionText: 'Des solutions de protection sur mesure pour votre situation personnelle ou professionnelle.',
    serviceClaims: 'Accompagnement en cas de sinistre',
    serviceClaimsText: 'En cas de sinistre, je vous accompagne en tant qu’intermédiaire entre la compagnie d’assurance et les assurés et pour défendre aux intérêts.',
    aboutEyebrow: 'À propos',
    aboutTitle: 'Personnelle. Compétence. À vos côtés.',
    aboutLead: 'En tant que propriétaire et directrice générale d’ASSAJ Consulting GmbH, je mets volontiers à votre disposition mes connaissances approfondies dans différents domaines de l’assurance.',
    aboutText: 'Grâce à mes nombreuses années d’expérience dans les secteurs de la finance et de l’assurance, je vous accompagne pour des questions d’assurance et élabore avec vous des solutions adaptées en matière de prévoyance et de protection.',
    qualification: 'Qualification',
    qualificationText: 'Experte en finance et investissements avec diplôme fédéral',
    portraitAlt: 'Andrea M. Jüngling, propriétaire d’ASSAJ Consulting GmbH',
    contactEyebrow: 'Contact',
    contactTitle: 'Parlons de vos besoins.',
    contactIntro: 'Vous avez des questions concernant votre situation d’assurance ou souhaitez bénéficier d’un conseil personnalisé ? Je me réjouis de votre prise de contact.',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'E-mail',
    commercialRegister: 'Registre du commerce',
    finma: 'Enregistrement FINMA',
    emailButton: 'Envoyer un e-mail',
    websiteBy: 'Site web par',
    imprint: 'Mentions légales',
    privacy: 'Déclaration de protection des données',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    modalClose: 'Fermer'
  },

  en: {
    htmlLang: 'en',
    locale: 'en_US',
    title: 'ASSAJ Consulting GmbH',
    description: 'ASSAJ Consulting GmbH in Birsfelden: personal advice for individual insurance, pension and protection solutions.',
    skip: 'Skip to main content',
    navServices: 'Services',
    navAbout: 'About me',
    navContact: 'Contact',
    heroTitle: 'Personal advice for individual <span>insurance solutions</span>',
    heroLead: 'Together, we develop tailored pension and protection solutions that suit your personal or business situation.',
    contactButton: 'Get in touch',
    moreButton: 'Learn more',
    servicesEyebrow: 'Services',
    servicesTitle: 'Comprehensive consulting for insurance solutions',
    servicesIntro: 'In-depth expertise and many years of experience in the financial and insurance sectors form the basis for advice tailored to your needs.',
    serviceInsurance: 'Insurance solutions',
    serviceInsuranceText: 'Personal advice on a wide range of insurance matters and the joint development of suitable solutions.',
    servicePension: 'Pension planning',
    servicePensionText: 'Individual pension solutions that take your personal situation and long-term needs into account.',
    serviceProtection: 'Protection',
    serviceProtectionText: 'Tailored protection solutions for your personal or business situation.',
    serviceClaims: 'Claims support',
    serviceClaimsText: 'In the event of a claim, I support you as a liaison between the insurance company and the insured and act in your interests.',
    aboutEyebrow: 'About me',
    aboutTitle: 'Personal. Competent.<br>By your side.',
    aboutLead: 'As owner and managing director of ASSAJ Consulting GmbH, I am pleased to provide you with professional support and in-depth expertise across a wide range of areas within the insurance industry.',
    aboutText: 'Thanks to my many years of experience in the financial and insurance sectors, I support you with a wide range of insurance matters and work with you to develop suitable pension and protection solutions.',
    qualification: 'Qualification',
    qualificationText: 'Expert in finance and investment, Advanced Federal Diploma',
    portraitAlt: 'Andrea M. Jüngling, owner of ASSAJ Consulting GmbH',
    contactEyebrow: 'Contact',
    contactTitle: 'Let’s talk.',
    contactIntro: 'Do you have questions about your insurance situation or would you like personal advice? I am looking forward to hearing from you soon.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    commercialRegister: 'Commercial register',
    finma: 'FINMA registration',
    emailButton: 'Send email',
    websiteBy: 'Website by',
    imprint: 'Legal notice',
    privacy: 'Privacy policy',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    modalClose: 'Close'
  }
};

const LEGAL = {
  de: {
    imprint: {
      title: 'Impressum',
      content: `
        <h3>Unternehmen</h3>
        <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Schweiz</p>

        <h3>Vertretungsberechtigte Person</h3>
        <p>Andrea M. Jüngling<br>Inhaberin und Geschäftsführerin<br>Finanz- und Anlageexpertin mit eidg. Diplom</p>

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
        <p>Der Schutz Ihrer persönlichen Daten ist der ASSAJ Consulting GmbH wichtig. Personendaten werden vertraulich und im Rahmen der anwendbaren datenschutzrechtlichen Bestimmungen bearbeitet.</p>

        <h3>Verantwortliche Stelle</h3>
        <p>Verantwortlich für die Datenbearbeitung ist:</p>
        <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Schweiz</p>
        <p>E-Mail: <a href="mailto:juengling@assajconsulting.ch">juengling@assajconsulting.ch</a><br>Telefon: <a href="tel:+41795489047">+41 79 548 90 47</a></p>

        <h3>Bearbeitung von Personendaten</h3>
        <p>Im Rahmen der Beratung und Versicherungsvermittlung können Personendaten bearbeitet werden, die für die Beratung, Betreuung, Vermittlung und Abwicklung von Versicherungs-, Vorsorge- und Absicherungslösungen erforderlich sind.</p>
        <p>Dazu können insbesondere Kontakt- und Stammdaten, Angaben zur persönlichen oder unternehmerischen Situation, Angaben zu bestehenden oder gewünschten Versicherungen und Vorsorgelösungen sowie weitere für die Beratung und Vermittlung erforderliche Informationen gehören.</p>

        <h3>Zweck der Datenbearbeitung</h3>
        <p>Personendaten werden insbesondere zur Beratung und Betreuung von Kundinnen und Kunden, zur Ermittlung und Überprüfung des Versicherungs- und Vorsorgebedarfs, zur Erarbeitung geeigneter Lösungen, zur Vermittlung und Betreuung von Versicherungsverträgen, zur Unterstützung bei der Schadenabwicklung sowie zur Kommunikation mit Kundinnen und Kunden und beteiligten Stellen bearbeitet.</p>

        <h3>Weitergabe von Personendaten</h3>
        <p>Personendaten werden nicht verkauft. Soweit dies zur Erbringung der vereinbarten Dienstleistungen erforderlich ist, können Personendaten insbesondere an Versicherungsgesellschaften, Vorsorgeeinrichtungen und weitere an der jeweiligen Versicherungs- oder Vorsorgelösung beteiligte Stellen übermittelt werden.</p>
        <p>Eine Weitergabe kann ausserdem erfolgen, wenn eine gesetzliche Verpflichtung besteht oder wenn sie für die technische Bereitstellung und den sicheren Betrieb der eingesetzten Systeme erforderlich ist.</p>

        <h3>Elektronischer Daten- und Informationsaustausch</h3>
        <p>Die Kommunikation mit Kundinnen und Kunden sowie weiteren beteiligten Stellen kann insbesondere per E-Mail, Telefon oder anderen elektronischen Kommunikationsmitteln erfolgen. Dabei werden angemessene technische und organisatorische Massnahmen zum Schutz der übermittelten Personendaten getroffen.</p>

        <h3>Kontaktaufnahme</h3>
        <p>Wenn Sie die ASSAJ Consulting GmbH per E-Mail oder Telefon kontaktieren, werden die von Ihnen übermittelten Personendaten zur Bearbeitung und Beantwortung Ihrer Anfrage sowie, soweit erforderlich, zur weiteren Beratung und Betreuung verwendet.</p>

        <h3>Server-Logfiles</h3>
        <p>Beim Besuch dieser Website können aus technischen Gründen automatisch Daten in sogenannten Server-Logfiles bearbeitet werden. Dazu können insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten oder Dateien, Browser- und Betriebssysteminformationen sowie Fehlermeldungen gehören.</p>
        <p>Diese Daten werden insbesondere zur Sicherstellung des technischen Betriebs und der Systemsicherheit sowie zur Fehleranalyse verwendet.</p>

        <h3>Technische Umsetzung und Betreuung der Website</h3>
        <p>Die technische Umsetzung und Betreuung dieser Website erfolgt durch:</p>
        <p>Aiza GmbH<br>Bernstrasse 159<br>3052 Zollikofen<br>Schweiz<br><a href="https://aiza.ch/" target="_blank" rel="noopener noreferrer">www.aiza.ch</a></p>
        <p>Soweit Aiza GmbH im Rahmen der technischen Betreuung Zugriff auf Personendaten erhält, erfolgt dieser ausschliesslich im für die technische Leistungserbringung erforderlichen Umfang.</p>

        <h3>Externe Links</h3>
        <p>Diese Website kann Links zu externen Webseiten enthalten. Beim Aufruf einer solchen Seite verlassen Sie die Website der ASSAJ Consulting GmbH. Für die Bearbeitung von Personendaten auf externen Webseiten ist der jeweilige Anbieter verantwortlich.</p>

        <h3>Datensicherheit</h3>
        <p>Die ASSAJ Consulting GmbH trifft angemessene technische und organisatorische Massnahmen, um Personendaten vor Verlust, Missbrauch, unberechtigtem Zugriff oder unbefugter Veränderung zu schützen.</p>

        <h3>Speicherdauer</h3>
        <p>Personendaten werden nur so lange aufbewahrt, wie dies für den jeweiligen Bearbeitungszweck erforderlich ist oder gesetzliche beziehungsweise vertragliche Aufbewahrungspflichten bestehen.</p>

        <h3>Ihre Rechte</h3>
        <p>Sie haben im Rahmen des anwendbaren Datenschutzrechts insbesondere das Recht, Auskunft darüber zu verlangen, ob und welche Personendaten über Sie bearbeitet werden. Soweit die gesetzlichen Voraussetzungen erfüllt sind, können Sie insbesondere die Berichtigung oder Löschung von Personendaten verlangen oder der Bearbeitung widersprechen.</p>
        <p>Entsprechende Anfragen können an die oben genannte Kontaktadresse gerichtet werden.</p>

        <h3>Änderungen</h3>
        <p>Die ASSAJ Consulting GmbH kann diese Datenschutzerklärung jederzeit anpassen. Es gilt die jeweils auf dieser Website veröffentlichte Version.</p>
      `
    }
  },

  fr: {
    imprint: {
      title: 'Mentions légales',
      content: `
        <h3>Entreprise</h3>
        <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Suisse</p>

        <h3>Personne autorisée à représenter l’entreprise</h3>
        <p>Andrea M. Jüngling<br>Propriétaire et directrice générale<br>Experte en finance et investissements avec diplôme fédéral</p>

        <h3>Contact</h3>
        <p>Téléphone : <a href="tel:+41795489047">+41 79 548 90 47</a><br>E-mail : <a href="mailto:juengling@assajconsulting.ch">juengling@assajconsulting.ch</a></p>

        <h3>Registre du commerce</h3>
        <p>CHE-291.490.260</p>

        <h3>Enregistrement FINMA</h3>
        <p>Numéro d’enregistrement F01067992</p>

        <h3>Réalisation et suivi technique du site</h3>
        <p>Aiza GmbH<br><a href="https://aiza.ch/" target="_blank" rel="noopener noreferrer">www.aiza.ch</a></p>

        <h3>Clause de non-responsabilité</h3>
        <p>ASSAJ Consulting GmbH ne garantit pas l’exactitude, l’exhaustivité ou l’actualité des contenus mis à disposition sur ce site.</p>
        <p>Dans la mesure autorisée par la loi, toute responsabilité d’ASSAJ Consulting GmbH pour des dommages matériels ou immatériels résultant de l’accès, de l’utilisation ou de la non-utilisation des informations publiées est exclue.</p>

        <h3>Liens externes</h3>
        <p>Les références et liens vers des sites de tiers se trouvent hors du domaine de responsabilité d’ASSAJ Consulting GmbH. Aucune responsabilité n’est assumée pour leur contenu ou leur légalité.</p>
      `
    },

    privacy: {
      title: 'Déclaration de protection des données',
      content: `
        <h3>Généralités</h3>
        <p>La protection de vos données personnelles est importante pour ASSAJ Consulting GmbH. Les données personnelles sont traitées de manière confidentielle et conformément aux dispositions applicables en matière de protection des données.</p>

        <h3>Responsable du traitement</h3>
        <p>Le responsable du traitement des données est :</p>
        <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Suisse</p>
        <p>E-mail : <a href="mailto:juengling@assajconsulting.ch">juengling@assajconsulting.ch</a><br>Téléphone : <a href="tel:+41795489047">+41 79 548 90 47</a></p>

        <h3>Traitement des données personnelles</h3>
        <p>Dans le cadre du conseil et de l’intermédiation en assurance, des données personnelles nécessaires au conseil, au suivi, à l’intermédiation et au traitement de solutions d’assurance, de prévoyance et de protection peuvent être traitées.</p>
        <p>Il peut notamment s’agir de coordonnées et de données de base, d’informations relatives à la situation personnelle ou professionnelle, aux assurances et solutions de prévoyance existantes ou souhaitées ainsi que d’autres informations nécessaires au conseil et à l’intermédiation.</p>

        <h3>Finalités du traitement</h3>
        <p>Les données personnelles sont notamment traitées pour conseiller et accompagner les clientes et clients, déterminer et vérifier leurs besoins en matière d’assurance et de prévoyance, élaborer des solutions appropriées, assurer l’intermédiation et le suivi des contrats d’assurance, apporter un soutien en cas de sinistre et communiquer avec les clientes et clients ainsi qu’avec les organismes concernés.</p>

        <h3>Transmission de données personnelles</h3>
        <p>Les données personnelles ne sont pas vendues. Dans la mesure nécessaire à la fourniture des prestations convenues, elles peuvent notamment être transmises à des compagnies d’assurance, institutions de prévoyance et autres organismes impliqués dans la solution d’assurance ou de prévoyance concernée.</p>

        <h3>Échange électronique de données et d’informations</h3>
        <p>La communication avec les clientes et clients ainsi qu’avec d’autres organismes concernés peut notamment s’effectuer par e-mail, téléphone ou autres moyens de communication électroniques. Des mesures techniques et organisationnelles appropriées sont prises pour protéger les données personnelles transmises.</p>

        <h3>Prise de contact</h3>
        <p>Lorsque vous contactez ASSAJ Consulting GmbH par e-mail ou par téléphone, les données personnelles que vous transmettez sont utilisées pour traiter votre demande, y répondre et, si nécessaire, assurer la suite du conseil et du suivi.</p>

        <h3>Fichiers journaux du serveur</h3>
        <p>Lors de la consultation de ce site, certaines données peuvent être automatiquement traitées dans des fichiers journaux du serveur pour des raisons techniques. Il peut notamment s’agir de l’adresse IP, de la date et de l’heure de l’accès, des pages ou fichiers consultés, des informations relatives au navigateur et au système d’exploitation ainsi que des messages d’erreur.</p>

        <h3>Réalisation et suivi technique du site</h3>
        <p>La réalisation et le suivi technique de ce site sont assurés par :</p>
        <p>Aiza GmbH<br>Bernstrasse 159<br>3052 Zollikofen<br>Suisse<br><a href="https://aiza.ch/" target="_blank" rel="noopener noreferrer">www.aiza.ch</a></p>

        <h3>Liens externes</h3>
        <p>Ce site peut contenir des liens vers des sites externes. Lorsque vous ouvrez un tel lien, vous quittez le site d’ASSAJ Consulting GmbH. Le fournisseur du site externe concerné est responsable du traitement des données personnelles sur celui-ci.</p>

        <h3>Sécurité des données</h3>
        <p>ASSAJ Consulting GmbH prend des mesures techniques et organisationnelles appropriées afin de protéger les données personnelles contre la perte, l’utilisation abusive, l’accès non autorisé ou la modification non autorisée.</p>

        <h3>Durée de conservation</h3>
        <p>Les données personnelles ne sont conservées que pendant la durée nécessaire à la finalité du traitement ou aussi longtemps que des obligations légales ou contractuelles de conservation s’appliquent.</p>

        <h3>Vos droits</h3>
        <p>Dans le cadre du droit applicable en matière de protection des données, vous avez notamment le droit de demander si des données personnelles vous concernant sont traitées et lesquelles. Lorsque les conditions légales sont remplies, vous pouvez notamment demander la rectification ou la suppression de données personnelles ou vous opposer à leur traitement.</p>

        <h3>Modifications</h3>
        <p>ASSAJ Consulting GmbH peut modifier la présente déclaration de protection des données à tout moment. La version publiée sur ce site est déterminante.</p>
      `
    }
  },

  en: {
    imprint: {
      title: 'Legal notice',
      content: `
        <h3>Company</h3>
        <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Switzerland</p>

        <h3>Authorised representative</h3>
        <p>Andrea M. Jüngling<br>Owner and Managing Director<br>Expert in finance and investment, Advanced Federal Diploma</p>

        <h3>Contact</h3>
        <p>Phone: <a href="tel:+41795489047">+41 79 548 90 47</a><br>Email: <a href="mailto:juengling@assajconsulting.ch">juengling@assajconsulting.ch</a></p>

        <h3>Commercial register</h3>
        <p>CHE-291.490.260</p>

        <h3>FINMA registration</h3>
        <p>Registration number F01067992</p>

        <h3>Website implementation and technical support</h3>
        <p>Aiza GmbH<br><a href="https://aiza.ch/" target="_blank" rel="noopener noreferrer">www.aiza.ch</a></p>

        <h3>Disclaimer</h3>
        <p>ASSAJ Consulting GmbH makes no warranty as to the accuracy, completeness or timeliness of the content provided on this website.</p>
        <p>To the extent permitted by law, ASSAJ Consulting GmbH accepts no liability for material or immaterial damage arising from access to, use of or inability to use the information published on this website.</p>

        <h3>External links</h3>
        <p>References and links to third-party websites are outside the area of responsibility of ASSAJ Consulting GmbH. No responsibility is accepted for their content or legality.</p>
      `
    },

    privacy: {
      title: 'Privacy policy',
      content: `
        <h3>General information</h3>
        <p>Protecting your personal data is important to ASSAJ Consulting GmbH. Personal data is treated confidentially and processed in accordance with applicable data protection legislation.</p>

        <h3>Controller</h3>
        <p>The controller responsible for processing personal data is:</p>
        <p>ASSAJ Consulting GmbH<br>Weidenweg 6<br>4127 Birsfelden<br>Switzerland</p>
        <p>Email: <a href="mailto:juengling@assajconsulting.ch">juengling@assajconsulting.ch</a><br>Phone: <a href="tel:+41795489047">+41 79 548 90 47</a></p>

        <h3>Processing of personal data</h3>
        <p>In connection with insurance advice and intermediation, personal data may be processed where necessary for advising and supporting clients and for arranging and administering insurance, pension and protection solutions.</p>
        <p>This may include contact and master data, information about your personal or business situation, information about existing or desired insurance and pension solutions and other information required for advice and intermediation.</p>

        <h3>Purposes of processing</h3>
        <p>Personal data is processed in particular to advise and support clients, determine and review insurance and pension requirements, develop suitable solutions, arrange and administer insurance contracts, provide support with claims and communicate with clients and other parties involved.</p>

        <h3>Disclosure of personal data</h3>
        <p>Personal data is not sold. Where necessary to provide the agreed services, personal data may in particular be disclosed to insurance companies, pension institutions and other parties involved in the relevant insurance or pension solution.</p>

        <h3>Electronic exchange of data and information</h3>
        <p>Communication with clients and other parties may take place by email, telephone or other electronic means of communication. Appropriate technical and organisational measures are taken to protect personal data transmitted in this way.</p>

        <h3>Contact</h3>
        <p>If you contact ASSAJ Consulting GmbH by email or telephone, the personal data you provide will be used to process and respond to your enquiry and, where necessary, for further advice and support.</p>

        <h3>Server log files</h3>
        <p>When you visit this website, data may automatically be processed in server log files for technical reasons. This may include your IP address, the date and time of access, pages or files accessed, browser and operating system information and error messages.</p>

        <h3>Website implementation and technical support</h3>
        <p>The website is implemented and technically supported by:</p>
        <p>Aiza GmbH<br>Bernstrasse 159<br>3052 Zollikofen<br>Switzerland<br><a href="https://aiza.ch/" target="_blank" rel="noopener noreferrer">www.aiza.ch</a></p>

        <h3>External links</h3>
        <p>This website may contain links to external websites. When you follow such a link, you leave the ASSAJ Consulting GmbH website. The respective provider is responsible for processing personal data on the external website.</p>

        <h3>Data security</h3>
        <p>ASSAJ Consulting GmbH takes appropriate technical and organisational measures to protect personal data against loss, misuse, unauthorised access or unauthorised alteration.</p>

        <h3>Retention period</h3>
        <p>Personal data is retained only for as long as necessary for the respective processing purpose or for as long as statutory or contractual retention obligations apply.</p>

        <h3>Your rights</h3>
        <p>Under applicable data protection law, you have in particular the right to request information as to whether and which personal data concerning you is being processed. Where the legal requirements are met, you may also request the correction or deletion of personal data or object to its processing.</p>

        <h3>Changes</h3>
        <p>ASSAJ Consulting GmbH may amend this privacy policy at any time. The version published on this website applies.</p>
      `
    }
  }
};

function detectLanguage() {
  const savedLanguage = localStorage.getItem('assaj-language');
  if (savedLanguage && TRANSLATIONS[savedLanguage]) return savedLanguage;

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const browserLanguage of browserLanguages) {
    const language = browserLanguage.toLowerCase().split('-')[0];
    if (TRANSLATIONS[language]) return language;
  }

  return 'de';
}

function setLanguage(language, save = true) {
  if (!TRANSLATIONS[language]) language = 'de';

  const translation = TRANSLATIONS[language];

  document.documentElement.lang = translation.htmlLang;
  document.documentElement.dataset.language = language;
  document.title = translation.title;

  descriptionMeta?.setAttribute('content', translation.description);
  ogTitleMeta?.setAttribute('content', translation.title);
  ogDescriptionMeta?.setAttribute('content', translation.description);
  ogLocaleMeta?.setAttribute('content', translation.locale);

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if (translation[key] !== undefined) element.textContent = translation[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.dataset.i18nHtml;
    if (translation[key] !== undefined) element.innerHTML = translation[key];
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const key = element.dataset.i18nAlt;
    if (translation[key] !== undefined) element.setAttribute('alt', translation[key]);
  });

  document.querySelectorAll('[data-language]').forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  if (hamburger) {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-label', open ? translation.menuClose : translation.menuOpen);
  }

  document.querySelector('.modal-close')?.setAttribute('aria-label', translation.modalClose);

  if (save) localStorage.setItem('assaj-language', language);

  if (currentLegalDocument && legalModal && !legalModal.hidden) renderLegalDocument(currentLegalDocument);
}

function getCurrentLanguage() {
  return document.documentElement.dataset.language || 'de';
}

function renderLegalDocument(type) {
  const legalDocument = LEGAL[getCurrentLanguage()]?.[type];
  if (!legalDocument || !legalModalTitle || !legalModalContent) return;

  legalModalTitle.textContent = legalDocument.title;
  legalModalContent.innerHTML = legalDocument.content;
}

function openMenu() {
  if (!hamburger || !mobileMenu) return;

  const translation = TRANSLATIONS[getCurrentLanguage()];

  mobileMenu.hidden = false;
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', translation.menuClose);
  document.body.classList.add('menu-open');

  requestAnimationFrame(() => mobileMenu.classList.add('is-open'));
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;

  const translation = TRANSLATIONS[getCurrentLanguage()];

  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', translation.menuOpen);
  document.body.classList.remove('menu-open');

  window.setTimeout(() => {
    if (!mobileMenu.classList.contains('is-open')) mobileMenu.hidden = true;
  }, 300);
}

hamburger?.addEventListener('click', () => {
  hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
});

mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    const language = button.dataset.language;
    if (!language) return;

    setLanguage(language);
    if (window.innerWidth <= 900) closeMenu();
  });
});

function openLegalModal(type, pushHistory = true) {
  if (!legalModal || !LEGAL[getCurrentLanguage()]?.[type]) return;

  lastFocusedElement = document.activeElement;
  currentLegalDocument = type;
  renderLegalDocument(type);

  legalModal.hidden = false;
  legalModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  if (pushHistory) history.pushState({ legalModal: type }, '', `#${type}`);

  requestAnimationFrame(() => {
    legalModal.classList.add('is-open');
    legalModal.querySelector('.modal-close')?.focus();
  });
}

function hideLegalModal() {
  if (!legalModal || legalModal.hidden) return;

  legalModal.classList.remove('is-open');
  legalModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  window.setTimeout(() => {
    if (legalModal.classList.contains('is-open')) return;

    legalModal.hidden = true;
    currentLegalDocument = null;

    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }, 200);
}

function closeLegalModal() {
  if (!legalModal || legalModal.hidden) return;

  if (history.state?.legalModal) {
    history.back();
  } else {
    hideLegalModal();
  }
}

document.querySelectorAll('[data-doc]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    if (link.dataset.doc) openLegalModal(link.dataset.doc);
  });
});

document.querySelectorAll('[data-close]').forEach(element => element.addEventListener('click', closeLegalModal));

window.addEventListener('popstate', event => {
  const type = event.state?.legalModal;

  if (type && LEGAL[getCurrentLanguage()]?.[type]) {
    openLegalModal(type, false);
  } else {
    hideLegalModal();
  }
});

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

setLanguage(detectLanguage(), false);