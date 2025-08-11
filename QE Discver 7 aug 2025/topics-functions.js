// Topics Functions for Edit Profile
// This file contains the topics functions

// Setup Topics category selection
function setupTopicsCategorySelection() {
    const topics = [
        { id: '3d-printing', name: '3D Printing', icon: '🖨️' },
        { id: '3d-bioprinting', name: '3D Bioprinting', icon: '🧬' },
        { id: '5g-network', name: '5G Network', icon: '📶' },
        { id: 'abrasives', name: 'Abrasives', icon: '🔧' },
        { id: 'substance-abuse', name: 'Substance abuse', icon: '🚫' },
        { id: 'access-management', name: 'Access management', icon: '🔐' },
        { id: 'healthcare-accessibility', name: 'Healthcare Accessibility', icon: '🏥' },
        { id: 'travel-accessibility', name: 'Travel Accessibility', icon: '♿' },
        { id: 'accident-insurance', name: 'Accident insurance', icon: '🛡️' },
        { id: 'acclimatization', name: 'Acclimatization', icon: '🌡️' },
        { id: 'accounting-auditing', name: 'Accounting & Auditing', icon: '📊' },
        { id: 'management-accounting', name: 'Management accounting', icon: '📈' },
        { id: 'forensic-accounting', name: 'Forensic accounting', icon: '🔍' },
        { id: 'acoustical-engineering', name: 'Acoustical engineering', icon: '🎵' },
        { id: 'acoustics', name: 'Acoustics', icon: '🔊' },
        { id: 'language-acquisition', name: 'Language acquisition', icon: '🗣️' },
        { id: 'talent-acquisition', name: 'Talent Acquisition', icon: '👥' },
        { id: 'mergers-acquisitions', name: 'Mergers and Acquisitions', icon: '🤝' },
        { id: 'climate-action', name: 'Climate action', icon: '🌍' },
        { id: 'physical-activity', name: 'Physical activity', icon: '🏃' },
        { id: 'actuator', name: 'Actuator', icon: '⚙️' },
        { id: 'acupuncture', name: 'Acupuncture', icon: '💉' },
        { id: 'acute-care', name: 'Acute care', icon: '🏥' },
        { id: 'climate-adaptation', name: 'Climate Adaptation', icon: '🌱' },
        { id: 'climate-change-adaptation', name: 'Climate Change Adaptation', icon: '🌿' },
        { id: 'adaptive-learning', name: 'Adaptive Learning', icon: '🧠' },
        { id: 'behavioral-health-addiction', name: 'Behavioral Health & Addiction', icon: '🧠' },
        { id: 'addiction-recovery', name: 'Addiction Recovery', icon: '💪' },
        { id: 'additive-manufacturing', name: 'Additive Manufacturing', icon: '🏭' },
        { id: 'adhesives-sealants', name: 'Adhesives & Sealants', icon: '🔗' },
        { id: 'public-administration', name: 'Public administration', icon: '🏛️' },
        { id: 'business-administration', name: 'Business administration', icon: '💼' },
        { id: 'military-administration', name: 'Military Administration', icon: '🎖️' },
        { id: 'adolescent-health-wellbeing', name: 'Adolescent Health & Wellbeing', icon: '👨‍⚕️' },
        { id: 'adolescent-medicine', name: 'Adolescent medicine', icon: '👩‍⚕️' },
        { id: 'adolescent-health', name: 'Adolescent health', icon: '🏥' },
        { id: 'adult-education', name: 'Adult Education', icon: '📚' },
        { id: 'adultery', name: 'Adultery', icon: '💔' },
        { id: 'advanced-materials', name: 'Advanced Materials', icon: '🔬' },
        { id: 'adventure-tourism', name: 'Adventure Tourism', icon: '🏔️' },
        { id: 'advertising', name: 'Advertising', icon: '📢' },
        { id: 'real-time-advertising', name: 'Real-Time Advertising', icon: '⏰' },
        { id: 'aeronautics', name: 'Aeronautics', icon: '✈️' },
        { id: 'aerosol', name: 'Aerosol', icon: '💨' },
        { id: 'aerospace', name: 'Aerospace', icon: '🚀' },
        { id: 'aesthetic-medicine', name: 'Aesthetic medicine', icon: '💄' },
        { id: 'public-affairs', name: 'Public affairs', icon: '📰' },
        { id: 'affordable-housing', name: 'Affordable Housing', icon: '🏠' },
        { id: 'african-studies', name: 'African studies', icon: '🌍' },
        { id: 'afroasiatic-studies', name: 'Afroasiatic Studies', icon: '📖' },
        { id: 'automotive-aftermarket', name: 'Automotive Aftermarket', icon: '🔧' },
        { id: 'agile-testing', name: 'Agile testing', icon: '🧪' },
        { id: 'agile-project-management', name: 'Agile Project Management', icon: '📋' },
        { id: 'agricultural-engineering', name: 'Agricultural engineering', icon: '🚜' },
        { id: 'agricultural-machinery', name: 'Agricultural machinery', icon: '🛠️' },
        { id: 'agricultural-economics', name: 'Agricultural economics', icon: '📊' },
        { id: 'agricultural-science', name: 'Agricultural science', icon: '🔬' },
        { id: 'sustainable-agriculture', name: 'Sustainable agriculture', icon: '🌱' },
        { id: 'regenerative-agriculture', name: 'Regenerative Agriculture', icon: '🌿' },
        { id: 'precision-agriculture', name: 'Precision agriculture', icon: '🎯' },
        { id: 'agritech', name: 'Agritech', icon: '🌾' },
        { id: 'agroforestry', name: 'Agroforestry', icon: '🌳' },
        { id: 'ethical-ai', name: 'Ethical AI', icon: '🤖' },
        { id: 'first-aid', name: 'First Aid', icon: '🩹' },
        { id: 'hiv-aids', name: 'HIV & AIDS', icon: '🔬' },
        { id: 'air-aviation-airports', name: 'Air, Aviation & Airports', icon: '✈️' },
        { id: 'air-water-management', name: 'Air & Water Management', icon: '💧' },
        { id: 'air-conditioning', name: 'Air conditioning', icon: '❄️' },
        { id: 'air-cargo', name: 'Air cargo', icon: '📦' },
        { id: 'air-pollution', name: 'Air pollution', icon: '🌫️' },
        { id: 'airport-operations', name: 'Airport Operations', icon: '🛫' },
        { id: 'albinism', name: 'Albinism', icon: '👤' },
        { id: 'alcohol', name: 'Alcohol', icon: '🍷' },
        { id: 'alcoholics-anonymous', name: 'Alcoholics Anonymous', icon: '🤝' },
        { id: 'algebra', name: 'Algebra', icon: '📐' },
        { id: 'algebraic-geometry', name: 'Algebraic geometry', icon: '📏' },
        { id: 'algorithms-computation', name: 'Algorithms & Computation', icon: '⚡' },
        { id: 'quantum-algorithms', name: 'Quantum Algorithms', icon: '🔮' },
        { id: 'allergy', name: 'Allergy', icon: '🤧' },
        { id: 'food-allergy', name: 'Food Allergy', icon: '🥜' },
        { id: 'alloy', name: 'Alloy', icon: '🔩' },
        { id: 'altaic-studies', name: 'Altaic Studies', icon: '📚' },
        { id: 'alternative-medicine', name: 'Alternative Medicine', icon: '🌿' },
        { id: 'alternative-investment', name: 'Alternative investment', icon: '💰' },
        { id: 'dementia-alzheimers', name: 'Dementia & Alzheimer\'s', icon: '🧠' },
        { id: 'ambulatory-care-surgery', name: 'Ambulatory Care & Surgery', icon: '🏥' },
        { id: 'latin-american-studies', name: 'Latin American studies', icon: '🌎' },
        { id: 'american-legion', name: 'American Legion', icon: '🎖️' },
        { id: 'american-studies', name: 'American studies', icon: '🇺🇸' },
        { id: 'amplifier', name: 'Amplifier', icon: '🔊' },
        { id: 'amusement-attractions', name: 'Amusement & Attractions', icon: '🎡' },
        { id: 'anaerobic-digestion', name: 'Anaerobic digestion', icon: '♻️' },
        { id: 'analog-electronics', name: 'Analog Electronics', icon: '📻' },
        { id: 'data-analysis', name: 'Data analysis', icon: '📊' },
        { id: 'numerical-analysis', name: 'Numerical analysis', icon: '🔢' },
        { id: 'structural-analysis', name: 'Structural Analysis', icon: '🏗️' },
        { id: 'qualitative-analysis', name: 'Qualitative Analysis', icon: '📝' },
        { id: 'geospatial-analysis', name: 'Geospatial Analysis', icon: '🗺️' },
        { id: 'text-analysis', name: 'Text Analysis', icon: '📄' },
        { id: 'analytical-chemistry', name: 'Analytical Chemistry', icon: '🧪' },
        { id: 'analytics-statistics', name: 'Analytics & Statistics', icon: '📈' },
        { id: 'predictive-analytics', name: 'Predictive analytics', icon: '🔮' },
        { id: 'business-analytics', name: 'Business analytics', icon: '📊' },
        { id: 'event-analytics', name: 'Event Analytics', icon: '📊' },
        { id: 'consumer-analytics', name: 'Consumer Analytics', icon: '👥' },
        { id: 'anarchism', name: 'Anarchism', icon: '⚖️' },
        { id: 'human-anatomy', name: 'Human Anatomy', icon: '🦴' },
        { id: 'anatomy-physiology', name: 'Anatomy & Physiology', icon: '🏥' },
        { id: 'plant-anatomy', name: 'Plant Anatomy', icon: '🌱' },
        { id: 'signs-symbols', name: 'Signs and Symbols', icon: '🛑' },
        { id: 'learning-development', name: 'Learning and Development', icon: '📚' },
        { id: 'diversity-inclusion', name: 'Diversity and Inclusion', icon: '🤝' },
        { id: 'customs-trade-management', name: 'Customs and Trade Management', icon: '📦' },
        { id: 'travel-safety-security', name: 'Travel Safety and Security', icon: '🛡️' },
        { id: 'anesthesiology', name: 'Anesthesiology', icon: '💊' },
        { id: 'angel-investing', name: 'Angel Investing', icon: '👼' },
        { id: 'angiology-vascular-medicine', name: 'Angiology & Vascular Medicine', icon: '❤️' },
        { id: 'angling', name: 'Angling', icon: '🎣' },
        { id: 'anglophone-studies', name: 'Anglophone Studies', icon: '🇬🇧' },
        { id: 'animal-husbandry-livestock', name: 'Animal Husbandry & Livestock', icon: '🐄' },
        { id: 'animal-welfare', name: 'Animal welfare', icon: '🐾' },
        { id: 'animal-science', name: 'Animal science', icon: '🔬' },
        { id: 'animal-nutrition', name: 'Animal nutrition', icon: '🥩' },
        { id: 'animal-health', name: 'Animal Health', icon: '🐕' },
        { id: 'anime-comic', name: 'Anime & Comic', icon: '🎌' },
        { id: 'narcotics-anonymous', name: 'Narcotics Anonymous', icon: '🤝' },
        { id: 'antarctic-studies', name: 'Antarctic Studies', icon: '🧊' },
        { id: 'anthropology', name: 'Anthropology', icon: '👥' },
        { id: 'antibiotics', name: 'Antibiotics', icon: '💊' },
        { id: 'antimicrobial-resistance', name: 'Antimicrobial resistance', icon: '🦠' },
        { id: 'antimicrobials', name: 'Antimicrobials', icon: '🧬' },
        { id: 'antiques-philately', name: 'Antiques & Philately', icon: '📮' },
        { id: 'consumer-appliances', name: 'Consumer Appliances', icon: '🏠' },
        { id: 'appliances', name: 'Appliances', icon: '🔌' },
        { id: 'application-security', name: 'Application security', icon: '🔒' },
        { id: 'applied-science', name: 'Applied science', icon: '🔬' },
        { id: 'applied-linguistics', name: 'Applied linguistics', icon: '🗣️' },
        { id: 'applied-psychology', name: 'Applied psychology', icon: '🧠' },
        { id: 'applied-physics', name: 'Applied physics', icon: '⚛️' },
        { id: 'applied-mechanics', name: 'Applied mechanics', icon: '⚙️' },
        { id: 'applied-economics', name: 'Applied economics', icon: '📊' },
        { id: 'applied-mathematics', name: 'Applied mathematics', icon: '📐' },
        { id: 'aquaculture', name: 'Aquaculture', icon: '🐟' },
        { id: 'aquaponics', name: 'Aquaponics', icon: '🌱' },
        { id: 'aquatic', name: 'Aquatic', icon: '🌊' },
        { id: 'arbitration', name: 'Arbitration', icon: '⚖️' },
        { id: 'arc-flash', name: 'Arc flash', icon: '⚡' },
        { id: 'archaeology', name: 'Archaeology', icon: '🏺' },
        { id: 'military-architecture', name: 'Military Architecture', icon: '🏰' },
        { id: 'architecture-designing', name: 'Architecture & Designing', icon: '🏛️' },
        { id: 'computer-architecture', name: 'Computer architecture', icon: '💻' },
        { id: 'software-architecture', name: 'Software architecture', icon: '🏗️' },
        { id: 'landscape-architecture', name: 'Landscape architecture', icon: '🌳' },
        { id: 'enterprise-architecture', name: 'Enterprise architecture', icon: '🏢' },
        { id: 'green-architecture', name: 'Green Architecture', icon: '🌿' },
        { id: 'arctic-studies', name: 'Arctic Studies', icon: '❄️' },
        { id: 'arithmetic', name: 'Arithmetic', icon: '🔢' },
        { id: 'armenian-studies', name: 'Armenian Studies', icon: '🇦🇲' },
        { id: 'arms-training', name: 'Arms Training', icon: '🎯' },
        { id: 'tattoo-art', name: 'Tattoo Art', icon: '🎨' },
        { id: 'fine-art', name: 'Fine art', icon: '🖼️' },
        { id: 'art-history', name: 'Art history', icon: '📚' },
        { id: 'art-market', name: 'Art market', icon: '💰' },
        { id: 'articulation', name: 'Articulation', icon: '🗣️' },
        { id: 'artificial-intelligence', name: 'Artificial Intelligence', icon: '🤖' },
        { id: 'artillery', name: 'Artillery', icon: '💥' },
        { id: 'performing-arts', name: 'Performing arts', icon: '🎭' },
        { id: 'visual-arts', name: 'Visual arts', icon: '🎨' },
        { id: 'culinary-arts', name: 'Culinary Arts', icon: '👨‍🍳' },
        { id: 'indo-aryan-studies', name: 'Indo-Aryan Studies', icon: '📖' },
        { id: 'asian-studies', name: 'Asian studies', icon: '🌏' },
        { id: 'asphalt', name: 'Asphalt', icon: '🛣️' },
        { id: 'risk-assessment', name: 'Risk assessment', icon: '⚠️' },
        { id: 'environmental-risk-assessment', name: 'Environmental Risk Assessment', icon: '🌍' },
        { id: 'asset-management', name: 'Asset Management', icon: '💼' },
        { id: 'digital-asset', name: 'Digital asset', icon: '💾' },
        { id: 'asset-protection', name: 'Asset protection', icon: '🛡️' },
        { id: 'real-assets', name: 'Real assets', icon: '🏠' },
        { id: 'assisted-living', name: 'Assisted Living', icon: '👴' },
        { id: 'assistive-technology', name: 'Assistive technology', icon: '♿' },
        { id: 'astrology', name: 'Astrology', icon: '⭐' },
        { id: 'astronomy', name: 'Astronomy', icon: '🔭' },
        { id: 'astrophysics', name: 'Astrophysics', icon: '🌌' },
        { id: 'safety-work', name: 'Safety at Work', icon: '👷' },
        { id: 'atrial-fibrillation', name: 'Atrial fibrillation', icon: '❤️' },
        { id: 'audience-engagement', name: 'Audience Engagement', icon: '👥' },
        { id: 'audiology', name: 'Audiology', icon: '👂' },
        { id: 'internal-audit', name: 'Internal audit', icon: '📋' },
        { id: 'augmented-reality', name: 'Augmented reality', icon: '🥽' },
        { id: 'austroasiatic-studies', name: 'Austroasiatic Studies', icon: '📚' },
        { id: 'austronesian-studies', name: 'Austronesian Studies', icon: '🌏' },
        { id: 'autism', name: 'Autism', icon: '🧩' },
        { id: 'auto-shows', name: 'Auto Shows', icon: '🚗' },
        { id: 'automation-robotics', name: 'Automation & Robotics', icon: '🤖' },
        { id: 'industrial-automation', name: 'Industrial Automation', icon: '🏭' },
        { id: 'test-automation', name: 'Test automation', icon: '🧪' },
        { id: 'automation-engineering', name: 'Automation engineering', icon: '⚙️' },
        { id: 'marketing-automation', name: 'Marketing automation', icon: '📢' },
        { id: 'automation', name: 'Automation', icon: '🤖' },
        { id: 'robotic-process-automation', name: 'Robotic process automation', icon: '🔄' },
        { id: 'warehouse-automation', name: 'Warehouse Automation', icon: '📦' },
        { id: 'automotive-electronics', name: 'Automotive electronics', icon: '🚗' },
        { id: 'autonomous-public-transport', name: 'Autonomous Public Transport', icon: '🚌' },
        { id: 'autonomous-transportation', name: 'Autonomous Transportation', icon: '🚛' },
        { id: 'autonomous-vehicle', name: 'Autonomous Vehicle', icon: '🚗' },
        { id: 'business-aviation', name: 'Business Aviation', icon: '✈️' },
        { id: 'aviation-safety', name: 'Aviation safety', icon: '🛡️' },
        { id: 'civil-aviation', name: 'Civil aviation', icon: '🛩️' },
        { id: 'aviation-technology', name: 'Aviation Technology', icon: '🚁' },
        { id: 'ayurveda-herbal', name: 'Ayurveda & Herbal', icon: '🌿' },
        { id: 'bacteria', name: 'Bacteria', icon: '🦠' },
        { id: 'bags', name: 'Bags', icon: '👜' },
        { id: 'bakery-confectionery', name: 'Bakery & Confectionery', icon: '🍰' },
        { id: 'work-life-balance', name: 'Work-Life Balance', icon: '⚖️' },
        { id: 'balance-trade', name: 'Balance of trade', icon: '📊' },
        { id: 'balkan-studies', name: 'Balkan Studies', icon: '🇧🇦' },
        { id: 'ballistics', name: 'Ballistics', icon: '🎯' },
        { id: 'baltic-studies', name: 'Baltic Studies', icon: '🇱🇹' },
        { id: 'retail-banking', name: 'Retail banking', icon: '🏦' },
        { id: 'private-banking', name: 'Private banking', icon: '💼' },
        { id: 'digital-banking', name: 'Digital banking', icon: '📱' },
        { id: 'open-banking', name: 'Open banking', icon: '🔓' },
        { id: 'bariatrics-metabolic-surgery', name: 'Bariatrics & Metabolic Surgery', icon: '⚖️' },
        { id: 'school-based-health', name: 'School-Based Health', icon: '🏫' },
        { id: 'river-basin-management', name: 'River Basin Management', icon: '🌊' },
        { id: 'bathroom-kitchen', name: 'Bathroom & Kitchen', icon: '🏠' },
        { id: 'battery', name: 'Battery', icon: '🔋' },
        { id: 'battery-recycling', name: 'Battery recycling', icon: '♻️' },
        { id: 'bearing', name: 'Bearing', icon: '⚙️' },
        { id: 'beef-production', name: 'Beef Production', icon: '🥩' },
        { id: 'beer-brewing', name: 'Beer & Brewing', icon: '🍺' },
        { id: 'craft-beer', name: 'Craft beer', icon: '🍻' },
        { id: 'consumer-behavior', name: 'Consumer Behavior', icon: '🛒' },
        { id: 'organizational-behavior', name: 'Organizational Behavior', icon: '🏢' },
        { id: 'behavioral-studies', name: 'Behavioral Studies', icon: '📊' },
        { id: 'behavioral-economics', name: 'Behavioral Economics', icon: '💰' },
        { id: 'cognitive-behavioral-therapy', name: 'Cognitive Behavioral Therapy', icon: '🧠' },
        { id: 'benchmarking', name: 'Benchmarking', icon: '📊' },
        { id: 'employee-benefits', name: 'Employee benefits', icon: '💼' },
        { id: 'bibliography', name: 'Bibliography', icon: '📚' },
        { id: 'motorcycle-bicycles', name: 'Motorcycle & Bicycles', icon: '🏍️' },
        { id: 'big-data', name: 'Big Data', icon: '📊' },
        { id: 'bike-sharing', name: 'Bike Sharing', icon: '🚲' },
        { id: 'bilingual-education', name: 'Bilingual education', icon: '🗣️' },
        { id: 'bimetallism', name: 'Bimetallism', icon: '🪙' },
        { id: 'biochemical-engineering', name: 'Biochemical Engineering', icon: '🧬' },
        { id: 'biochemistry', name: 'Biochemistry', icon: '🧪' },
        { id: 'biocide', name: 'Biocide', icon: '🧬' },
        { id: 'biodegradable-product', name: 'Biodegradable Product', icon: '♻️' },
        { id: 'biodiversity-conservation', name: 'Biodiversity Conservation', icon: '🌿' },
        { id: 'biosensors-bioelectronics', name: 'Biosensors & Bioelectronics', icon: '🔬' },
        { id: 'bioenergy', name: 'Bioenergy', icon: '⚡' },
        { id: 'bioethics', name: 'Bioethics', icon: '⚖️' },
        { id: 'bioinformatics', name: 'Bioinformatics', icon: '💻' },
        { id: 'biological-engineering', name: 'Biological engineering', icon: '🧬' },
        { id: 'biological-psychiatry', name: 'Biological psychiatry', icon: '🧠' },
        { id: 'biologics', name: 'Biologics', icon: '💊' },
        { id: 'molecular-biology', name: 'Molecular Biology', icon: '🧬' },
        { id: 'developmental-biology', name: 'Developmental Biology', icon: '🌱' },
        { id: 'cell-biology', name: 'Cell Biology', icon: '🔬' },
        { id: 'chemical-biology', name: 'Chemical Biology', icon: '🧪' },
        { id: 'computational-biology-chemistry', name: 'Computational Biology & Chemistry', icon: '💻' },
        { id: 'synthetic-biology', name: 'Synthetic biology', icon: '🧬' },
        { id: 'computational-biology', name: 'Computational biology', icon: '💻' },
        { id: 'conservation-biology', name: 'Conservation biology', icon: '🌿' },
        { id: 'structural-biology', name: 'Structural biology', icon: '🏗️' },
        { id: 'marine-biology', name: 'Marine Biology', icon: '🌊' },
        { id: 'biomass-energy', name: 'Biomass Energy', icon: '🌱' },
        { id: 'biomaterials-science-engineering', name: 'Biomaterials Science & Engineering', icon: '🔬' },
        { id: 'biomechanics', name: 'Biomechanics', icon: '🏃' },
        { id: 'biomedical-engineering', name: 'Biomedical Engineering', icon: '🏥' },
        { id: 'biometrics', name: 'Biometrics', icon: '👁️' },
        { id: 'bionics-biomimetics', name: 'Bionics & Biomimetics', icon: '🤖' },
        { id: 'biophysics', name: 'Biophysics', icon: '⚛️' },
        { id: 'liquid-biopsy', name: 'Liquid biopsy', icon: '🩸' },
        { id: 'biostatistics', name: 'Biostatistics', icon: '📊' },
        { id: 'plant-genomics-biotech', name: 'Plant Genomics & Biotech', icon: '🌱' },
        { id: 'biotechnology', name: 'Biotechnology', icon: '🧬' },
        { id: 'bladder-cancer', name: 'Bladder cancer', icon: '🏥' },
        { id: 'blended-learning', name: 'Blended learning', icon: '📚' },
        { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
        { id: 'blue-economy', name: 'Blue Economy', icon: '🌊' },
        { id: 'paper-pulp-board', name: 'Paper, Pulp & Board', icon: '📄' },
        { id: 'boarding-school', name: 'Boarding school', icon: '🏫' },
        { id: 'marine-boat', name: 'Marine & Boat', icon: '🚤' },
        { id: 'boats-boat-shows', name: 'Boats & Boat Shows', icon: '⛵' },
        { id: 'mind-body-interaction', name: 'Mind-Body Interaction', icon: '🧘' },
        { id: 'body-language', name: 'Body Language', icon: '👤' },
        { id: 'book-design', name: 'Book design', icon: '📖' },
        { id: 'book-conservation', name: 'Book Conservation', icon: '📚' },
        { id: 'profit-booking', name: 'Profit Booking', icon: '💰' },
        { id: 'books-publishing', name: 'Books & Publishing', icon: '📚' },
        { id: 'botany', name: 'Botany', icon: '🌱' },
        { id: 'brakes', name: 'Brakes', icon: '🛑' },
        { id: 'brand-protection', name: 'Brand protection', icon: '🛡️' },
        { id: 'brand-management', name: 'Brand Management', icon: '🏷️' },
        { id: 'data-breach', name: 'Data breach', icon: '🔓' },
        { id: 'circuit-breakers', name: 'Circuit Breakers', icon: '⚡' },
        { id: 'breast-cancer', name: 'Breast Cancer', icon: '🏥' },
        { id: 'wedding-bridal', name: 'Wedding & Bridal', icon: '💒' },
        { id: 'bridge-engineering', name: 'Bridge Engineering', icon: '🌉' },
        { id: 'broadcasting-technology', name: 'Broadcasting Technology', icon: '📺' },
        { id: 'buddhist-studies', name: 'Buddhist Studies', icon: '☸️' },
        { id: 'building-information-modeling', name: 'Building Information Modeling', icon: '🏗️' },
        { id: 'green-building', name: 'Green building', icon: '🌿' },
        { id: 'zero-energy-building', name: 'Zero-Energy Building', icon: '🏠' },
        { id: 'built-environment', name: 'Built environment', icon: '🏙️' },
        { id: 'business-management', name: 'Business Management', icon: '💼' },
        { id: 'small-business', name: 'Small Business', icon: '🏪' },
        { id: 'business-education', name: 'Business education', icon: '📚' },
        { id: 'business-intelligence', name: 'Business intelligence', icon: '📊' },
        { id: 'business-ethics', name: 'Business ethics', icon: '⚖️' },
        { id: 'business-development', name: 'Business development', icon: '📈' },
        { id: 'business-process', name: 'Business process', icon: '🔄' },
        { id: 'family-business', name: 'Family business', icon: '👨‍👩‍👧‍👦' },
        { id: 'business-economics', name: 'Business economics', icon: '💰' },
        { id: 'business-networking', name: 'Business networking', icon: '🤝' },
        { id: 'business-marketing', name: 'Business marketing', icon: '📢' },
        { id: 'business-case', name: 'Business case', icon: '📋' },
        { id: 'business-valuation', name: 'Business valuation', icon: '💰' },
        { id: 'sustainable-business', name: 'Sustainable business', icon: '🌱' },
        { id: 'business-travel', name: 'Business travel', icon: '✈️' },
        { id: 'business-tourism', name: 'Business tourism', icon: '🏢' },
        { id: 'business-transformation', name: 'Business transformation', icon: '🔄' },
        { id: 'business-communication', name: 'Business communication', icon: '💬' },
        { id: 'business-model', name: 'Business model', icon: '📊' },
        { id: 'byproduct', name: 'Byproduct', icon: '♻️' }
    ];
    
    const grid = document.getElementById('topics-grid');
    if (grid) {
        grid.innerHTML = topics.map(topic => `
            <div class="category-card" data-category="${topic.id}">
                <div class="category-icon">${topic.icon}</div>
                <div class="category-name">${topic.name}</div>
            </div>
        `).join('');
        
        // Add click handlers
        grid.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', handleTopicCardClick);
        });
        
        // Load previously selected topics
        loadPreviouslySelectedTopics();
    }
}

// Load previously selected topics
function loadPreviouslySelectedTopics() {
    try {
        const savedTopics = localStorage.getItem('selectedTopics');
        if (savedTopics) {
            const selectedTopics = JSON.parse(savedTopics);
            
            // Mark previously selected cards
            selectedTopics.forEach(topicId => {
                const card = document.querySelector(`[data-category="${topicId}"]`);
                if (card) {
                    card.classList.add('selected');
                }
            });
            
            // Update counter
            updateTopicsCounter();
            
            console.log('Loaded previously selected topics:', selectedTopics);
        }
    } catch (error) {
        console.error('Error loading previously selected topics:', error);
    }
}

// Handle topic card click
function handleTopicCardClick(event) {
    const card = event.currentTarget;
    const categoryId = card.dataset.category;
    
    card.classList.toggle('selected');
    
    // Update counter
    updateTopicsCounter();
    
    console.log('Topic card clicked:', categoryId);
}

// Update topics counter
function updateTopicsCounter() {
    const selectedCards = document.querySelectorAll('#topics-grid .category-card.selected');
    const counter = document.getElementById('topics-counter');
    const continueBtn = document.getElementById('topics-continue-btn');
    
    if (counter) {
        counter.textContent = selectedCards.length;
    }
    
    if (continueBtn) {
        if (selectedCards.length > 0) {
            continueBtn.classList.add('show');
            continueBtn.disabled = false;
        } else {
            continueBtn.classList.remove('show');
            continueBtn.disabled = true;
        }
    }
}

// Save topics selection
function saveTopicsSelection() {
    try {
        const selectedCards = document.querySelectorAll('#topics-grid .category-card.selected');
        const selectedCategories = Array.from(selectedCards).map(card => card.dataset.category);
        
        // Update the topics values display
        const topicsValues = document.getElementById('topics-values');
        if (topicsValues) {
            const categoryNames = selectedCards.length > 0 
                ? Array.from(selectedCards).map(card => card.querySelector('.category-name').textContent).join(', ')
                : 'No categories selected';
            topicsValues.textContent = categoryNames;
        }
        
        // Save to localStorage
        localStorage.setItem('selectedTopics', JSON.stringify(selectedCategories));
        
        // Close modal
        closeTopicsModal();
        
        showToast('Topics updated successfully!', 'success');
        
        console.log('Topics saved:', selectedCategories);
    } catch (error) {
        console.error('❌ Error saving topics selection:', error);
        showToast('Error saving topics selection', 'error');
    }
}

// Filter topics based on search
function filterTopics(searchTerm) {
    const cards = document.querySelectorAll('#topics-grid .category-card');
    const searchLower = searchTerm.toLowerCase();
    
    cards.forEach(card => {
        const topicName = card.querySelector('.category-name').textContent.toLowerCase();
        if (topicName.includes(searchLower)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update counter for visible selected cards
    updateTopicsCounter();
}

// Close Topics modal
function closeTopicsModal() {
    const modal = document.getElementById('topics-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // Reset counter and button state
            const counter = document.getElementById('topics-counter');
            const continueBtn = document.getElementById('topics-continue-btn');
            if (counter) counter.textContent = '0';
            if (continueBtn) {
                continueBtn.classList.remove('show');
                continueBtn.disabled = true;
            }
            // Clear search
            const searchInput = document.getElementById('topics-search');
            if (searchInput) {
                searchInput.value = '';
                filterTopics('');
            }
        }, 300);
    }
}
