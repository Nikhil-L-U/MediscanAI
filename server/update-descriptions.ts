import { connectDb } from "./db";
import { HealthRecords } from "../shared/schema";

interface ExpansionMapping {
  keywords: string[];
  expandedDescription: string;
  expandedTreatment: string;
}

const expansionMappings: ExpansionMapping[] = [
  {
    keywords: ["hypertension", "high blood pressure"],
    expandedDescription: "Patient has been diagnosed with hypertension, a chronic medical condition characterized by persistently elevated blood pressure levels above 140/90 mmHg. This condition can lead to serious complications if not properly managed, including increased risk of heart disease, stroke, kidney damage, and vision problems. Common symptoms may include headaches, dizziness, blurred vision, chest pain, and shortness of breath. Causes can include genetics, poor diet high in salt, lack of physical exercise, obesity, stress, smoking, and certain medications or underlying conditions.",
    expandedTreatment: "Management of hypertension involves a comprehensive approach including lifestyle modifications and pharmacological interventions. Lifestyle changes include adopting the DASH (Dietary Approaches to Stop Hypertension) diet, reducing sodium intake to under 2.3g/day, engaging in regular aerobic physical activity for at least 30 minutes daily, maintaining a healthy weight, limiting alcohol consumption, and smoking cessation. Pharmacological treatment may include first-line agents such as thiazide diuretics, ACE inhibitors (e.g., Lisinopril), Angiotensin II receptor blockers (ARBs), or Calcium channel blockers (e.g., Amlodipine), often used in combination to achieve target blood pressure levels. Regular monitoring of blood pressure at home and in clinical settings is essential."
  },
  {
    keywords: ["diabetes", "type 2 diabetes"],
    expandedDescription: "Patient has been diagnosed with type 2 diabetes, a metabolic disorder characterized by high blood sugar levels due to insulin resistance or insufficient insulin production. This chronic condition can lead to complications such as cardiovascular disease, nerve damage, kidney failure, eye problems, and foot ulcers. Symptoms may include frequent urination, excessive thirst, unexplained weight loss, increased hunger, fatigue, slow-healing sores, frequent infections, blurred vision, and tingling or numbness in hands or feet. Causes often include genetics, obesity, sedentary lifestyle, poor diet, and age.",
    expandedTreatment: "Treatment for Type 2 Diabetes focuses on maintaining blood glucose levels within a target range to prevent complications. This involves a combination of dietary management (low glycemic index foods, carbohydrate counting), regular physical activity, and weight management. Pharmacotherapy typically begins with Metformin as the first-line medication. Additional medications may include Sulfonylureas, DPP-4 inhibitors, SGLT2 inhibitors, GLP-1 receptor agonists, or insulin therapy depending on HbA1c levels and disease progression. Regular monitoring of blood glucose, HbA1c (every 3-6 months), lipid profile, kidney function, and annual eye and foot examinations are critical components of long-term care."
  },
  {
    keywords: ["common cold", "viral infection", "viral upper respiratory infection"],
    expandedDescription: "Patient is experiencing a common cold, a viral infection of the upper respiratory tract caused by various viruses such as rhinovirus. This self-limiting illness typically lasts 7-10 days and is characterized by symptoms including runny nose, sore throat, cough, congestion, mild fever, and general malaise. While usually harmless, it can lead to complications like sinusitis or ear infections in some cases. Treatment focuses on symptom relief with rest, hydration, over-the-counter medications, and avoiding spread to others.",
    expandedTreatment: "There is no cure for the common cold; treatment is symptomatic and supportive. Recommendations include adequate rest and increased fluid intake (water, herbal tea, broth) to prevent dehydration. Over-the-counter medications can provide relief: analgesics (Acetaminophen, Ibuprofen) for fever and body aches, decongestants (Pseudoephedrine) for nasal congestion, antihistamines for runny nose, and antitussives or expectorants for cough. Saline nasal sprays and gargling with warm salt water can soothe throat irritation. Antibiotics are not effective against viral infections and are not prescribed unless a secondary bacterial infection develops."
  },
  {
    keywords: ["asthma", "chronic respiratory condition", "respiratory condition"],
    expandedDescription: "Patient suffers from asthma, a chronic inflammatory disease of the airways characterized by recurrent episodes of wheezing, breathlessness, chest tightness, and coughing. This condition causes the airways to become inflamed and narrowed, making breathing difficult. Triggers can include allergens, exercise, cold air, stress, infections, and irritants like smoke. Management involves avoiding triggers, using inhalers for quick relief, and long-term control medications to reduce inflammation and prevent exacerbations.",
    expandedTreatment: "Asthma management follows a stepwise approach based on severity and control. Pharmacotherapy includes two main categories: quick-relief medications (Short-acting beta-agonists like Albuterol) for acute symptoms, and long-term control medications (Inhaled corticosteroids like Fluticasone, Long-acting beta-agonists, Leukotriene modifiers) to reduce inflammation and prevent attacks. An Asthma Action Plan is essential, detailing daily management, how to handle worsening symptoms, and when to seek emergency care. Trigger avoidance (dust mites, pollen, smoke) and proper inhaler technique are crucial for effective control. Severe cases may require biologic therapies."
  },
  {
    keywords: ["allergies", "seasonal allergies"],
    expandedDescription: "Patient experiences seasonal allergies, an immune system response to substances like pollen, dust mites, pet dander, or mold that are typically harmless. Symptoms include sneezing, runny or stuffy nose, itchy eyes, throat, or ears, and sometimes skin rashes. This condition can significantly impact quality of life and may lead to complications like sinus infections or asthma exacerbations. Treatment includes antihistamines, nasal sprays, eye drops, and allergen avoidance strategies.",
    expandedTreatment: "Treatment strategies for seasonal allergies focus on symptom relief and allergen avoidance. Pharmacological options include oral antihistamines (Cetirizine, Loratadine, Fexofenadine) to reduce sneezing and itching, intranasal corticosteroids (Fluticasone, Mometasone) for nasal congestion and inflammation, and decongestants for short-term relief of stuffiness. Saline nasal irrigation can help flush out allergens. For persistent or severe allergies, immunotherapy (allergy shots or sublingual tablets) may be recommended to desensitize the immune system over time. minimizing exposure by keeping windows closed during high pollen seasons and using air purifiers is also advised."
  },
  {
    keywords: ["migraine", "severe headache", "severe recurring headaches"],
    expandedDescription: "Patient suffers from migraines, a neurological condition characterized by intense, debilitating headaches often accompanied by nausea, vomiting, and sensitivity to light, sound, and smell. These episodes can last from hours to days and may be preceded by aura symptoms like visual disturbances. Triggers include stress, certain foods, hormonal changes, lack of sleep, and environmental factors. Management involves identifying and avoiding triggers, using acute medications for attacks, and preventive treatments for frequent episodes.",
    expandedTreatment: "Migraine management involves both acute (abortive) treatment and preventive therapy. Acute treatment aims to stop a migraine attack once it starts and includes NSAIDs (Ibuprofen, Naproxen), Triptans (Sumatriptan, Rizatriptan), or Ergotamines. Anti-nausea medications may also be used. Preventive treatment is considered for frequent or severe attacks and may include Beta-blockers (Propranolol), Anticonvulsants (Topiramate), or CGRP inhibitors. Lifestyle modifications such as maintaining a regular sleep schedule, staying hydrated, managing stress, and avoiding known dietary triggers (e.g., caffeine, alcohol, aged cheeses) are fundamental to reducing attack frequency."
  },
  {
    keywords: ["anxiety", "generalized anxiety disorder"],
    expandedDescription: "Patient has been diagnosed with generalized anxiety disorder, a mental health condition characterized by persistent and excessive worry about various aspects of life, often without a specific trigger. Symptoms include restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep disturbances. This chronic condition can significantly impair daily functioning and may co-occur with depression or other anxiety disorders. Treatment typically involves psychotherapy, medications like SSRIs, lifestyle changes, and stress management techniques.",
    expandedTreatment: "Treatment for Generalized Anxiety Disorder (GAD) typically involves a combination of psychotherapy and pharmacotherapy. Cognitive Behavioral Therapy (CBT) is the most effective form of psychotherapy, helping patients identify and challenge negative thought patterns. Pharmacological treatment often includes Selective Serotonin Reuptake Inhibitors (SSRIs like Escitalopram, Sertraline) or Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs like Venlafaxine) as first-line agents. Benzodiazepines may be used for short-term relief of acute anxiety but are generally avoided for long-term use due to dependency risks. Lifestyle interventions such as regular exercise, mindfulness meditation, adequate sleep, and reducing caffeine intake are also supportive."
  },
  {
    keywords: ["fracture", "arm fracture", "radius", "broken bone"],
    expandedDescription: "Patient has sustained a bone fracture, a break in one of the bones commonly occurring due to trauma such as falls, sports injuries, or accidents. Symptoms include severe pain, swelling, bruising, deformity, inability to move the affected area, and possible numbness or tingling. Treatment depends on the type and location of the fracture but may involve immobilization with casts or splints, pain management, and in some cases, surgical intervention. Recovery time varies but typically involves physical therapy to restore function.",
    expandedTreatment: "Treatment of a bone fracture focuses on realigning the bone fragments (reduction) and maintaining alignment until healing occurs (immobilization). Non-surgical treatment involves casting or splinting for several weeks. Complex or unstable fractures may require surgical intervention with Open Reduction and Internal Fixation (ORIF) using plates, screws, or rods. Pain management with analgesics (Acetaminophen, NSAIDs, or opioids for severe pain) is provided. Post-immobilization, physical therapy is essential to restore range of motion, strength, and function. Calcium and Vitamin D supplementation may be recommended to support bone healing."
  },
  {
    keywords: ["depression", "major depressive disorder"],
    expandedDescription: "Patient is experiencing major depressive disorder, a serious mental health condition characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities once enjoyed. Symptoms may include changes in sleep patterns, appetite, energy levels, concentration, self-worth, and may include thoughts of death or suicide. This condition can be triggered by life events, genetics, brain chemistry imbalances, or medical conditions. Treatment often involves psychotherapy, antidepressant medications, lifestyle changes, and support systems.",
    expandedTreatment: "Management of Major Depressive Disorder involves a multimodal approach. Pharmacotherapy typically starts with SSRIs (Fluoxetine, Sertraline) or SNRIs, which may take 4-6 weeks to show full effect. Psychotherapy, particularly Cognitive Behavioral Therapy (CBT) or Interpersonal Therapy (IPT), is highly effective alone or in combination with medication. For treatment-resistant depression, options like switching medication classes, augmentation strategies, or therapies like TMS (Transcranial Magnetic Stimulation) may be considered. Lifestyle changes including regular exercise, healthy diet, sleep hygiene, and social engagement are critical. Regular follow-up to monitor mood and suicide risk is mandatory."
  },
  {
    keywords: ["arthritis", "joint pain", "joint inflammation"],
    expandedDescription: "Patient suffers from arthritis, a condition involving inflammation of the joints leading to pain, stiffness, and reduced mobility. This can be osteoarthritis (wear-and-tear) or rheumatoid arthritis (autoimmune). Symptoms include joint pain, swelling, redness, warmth, and decreased range of motion. Causes vary but include age, genetics, injury, and autoimmune factors. Management includes pain relief medications, physical therapy, lifestyle modifications, and in some cases, surgical interventions to improve quality of life.",
    expandedTreatment: "Arthritis treatment aims to relieve pain, reduce inflammation, and improve joint function. For Osteoarthritis, treatment includes Acetaminophen, NSAIDs (topical or oral), and physical therapy to strengthen muscles around joints. Weight loss is crucial for weight-bearing joints. Corticosteroid or hyaluronic acid injections may provide temporary relief. For Rheumatoid Arthritis, Disease-Modifying Antirheumatic Drugs (DMARDs like Methotrexate) and Biologics are used to slow disease progression. Physical and occupational therapy help maintain mobility and independence. In advanced cases with severe joint damage, surgical options like joint replacement (arthroplasty) may be necessary."
  },
  {
    keywords: ["heart disease", "coronary artery disease"],
    expandedDescription: "Patient has coronary artery disease, a condition where the coronary arteries become narrowed or blocked due to plaque buildup, reducing blood flow to the heart muscle. This can lead to chest pain (angina), shortness of breath, fatigue, and increased risk of heart attack or heart failure. Risk factors include high cholesterol, hypertension, smoking, diabetes, obesity, and family history. Treatment may involve lifestyle changes, medications, angioplasty, or bypass surgery to improve blood flow and prevent complications.",
    expandedTreatment: "Treatment for Coronary Artery Disease (CAD) focuses on managing symptoms and preventing cardiovascular events. Lifestyle modifications are foundational: smoking cessation, heart-healthy diet (low saturated fat, low sodium), regular exercise, and weight control. Pharmacological therapy includes Antiplatelets (Aspirin, Clopidogrel) to prevent clots, Statins (Atorvastatin) to lower cholesterol, Beta-blockers to reduce heart workload, and Nitroglycerin for angina relief. ACE inhibitors may be prescribed for heart protection. Revascularization procedures such as Percutaneous Coronary Intervention (PCI/Angioplasty with stenting) or Coronary Artery Bypass Grafting (CABG) surgery are indicated for significant blockages or severe symptoms."
  },
  {
    keywords: ["pneumonia", "lung infection"],
    expandedDescription: "Patient has developed pneumonia, an infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus. Symptoms include cough with phlegm, fever, chills, shortness of breath, chest pain, fatigue, and confusion in severe cases. Causes can be bacterial, viral, or fungal, often following a respiratory infection. Treatment depends on the cause but may include antibiotics, antivirals, rest, hydration, and oxygen therapy. Complications can include pleural effusion or respiratory failure.",
    expandedTreatment: "Treatment of pneumonia depends on the etiology (bacterial, viral, fungal) and severity. Bacterial pneumonia is treated with antibiotics (e.g., Amoxicillin, Azithromycin, or Fluoroquinolones), chosen based on likely pathogens and patient comorbidities. Viral pneumonia is generally treated with supportive care (rest, fluids, antipyretics), though antivirals may be used for influenza-related pneumonia. Fungal pneumonia requires antifungal medication. Severe cases requiring hospitalization may need intravenous antibiotics, oxygen therapy, and respiratory support. Follow-up chest X-rays may be needed to ensure resolution of the infection."
  },
  {
    keywords: ["acute bronchitis", "bronchitis", "inflammation of the bronchial tubes"],
    expandedDescription: "Patient has been diagnosed with acute bronchitis, an inflammation of the bronchial tubes (airways) that carry air to and from the lungs. This condition is typically caused by viral infections and results in coughing, mucus production, chest discomfort, fatigue, and mild fever. Symptoms usually last 1-3 weeks and may include wheezing and shortness of breath. While most cases resolve on their own, treatment focuses on symptom relief with rest, fluids, humidifiers, and over-the-counter medications. Bacterial bronchitis may require antibiotics. Complications can include pneumonia if left untreated.",
    expandedTreatment: "Acute bronchitis is predominantly viral and self-limiting, so treatment is largely supportive. Antibiotics are generally NOT recommended unless there is strong evidence of a bacterial cause (e.g., pertussis). Management includes rest, adequate hydration, and use of a humidifier to loosen secretions. Cough suppressants (Dextromethorphan) can be used for dry, disruptive coughs, while expectorants (Guaifenesin) help clear mucus. Inhaled bronchodilators (Albuterol) may be prescribed if wheezing is present. NSAIDs or Acetaminophen are used for fever and chest discomfort. Patients are advised to avoid smoke and other lung irritants during recovery."
  },
  {
    keywords: ["gastritis", "stomach lining inflammation"],
    expandedDescription: "Patient is experiencing gastritis, an inflammation of the stomach lining that can occur suddenly (acute) or develop gradually over time (chronic). Common causes include bacterial infections (H. pylori), excessive alcohol consumption, prolonged use of NSAIDs, stress, and autoimmune disorders. Symptoms include burning stomach pain, nausea, vomiting, bloating, loss of appetite, and indigestion. If left untreated, gastritis can lead to stomach ulcers and bleeding. Treatment involves medications to reduce stomach acid, antibiotics for H. pylori infection, and dietary modifications including avoiding spicy, acidic, and fried foods.",
    expandedTreatment: "Gastritis treatment addresses the underlying cause and reduces stomach acidity to allow the lining to heal. If H. pylori infection is confirmed, 'triple therapy' (two antibiotics plus a proton pump inhibitor) is standard. For NSAID-induced gastritis, discontinuing the offending drug is crucial. Acid suppression therapy involves Proton Pump Inhibitors (PPIs like Omeprazole) or H2 blockers (Famotidine) to reduce acid production, and Antacids for immediate symptom relief. Dietary modifications are essential: avoiding alcohol, spicy foods, acidic beverages, and eating smaller, more frequent meals. Stress reduction techniques may also be beneficial."
  },
  {
    keywords: ["dengue", "dengue fever", "mosquito-borne viral infection"],
    expandedDescription: "Patient has been diagnosed with dengue fever, a mosquito-borne viral infection transmitted by Aedes mosquitoes. This tropical disease is characterized by sudden high fever, severe headache, pain behind the eyes, joint and muscle pain, rash, and mild bleeding manifestations. Symptoms typically appear 4-10 days after infection and last 2-7 days. In severe cases, dengue can progress to dengue hemorrhagic fever or dengue shock syndrome, which can be life-threatening. Treatment is supportive, focusing on hydration, rest, and pain management with acetaminophen. Close monitoring of platelet count and fluid balance is essential. Prevention involves mosquito control and avoiding mosquito bites.",
    expandedTreatment: "There is no specific antiviral treatment for dengue fever; management is supportive and focuses on maintaining fluid volume. Critical components include bed rest and aggressive oral rehydration with electrolyte solutions to prevent dehydration. Acetaminophen (Paracetamol) is used for fever and pain control; NSAIDs like Ibuprofen and Aspirin MUST be avoided as they increase bleeding risk. Patients require close monitoring of vital signs, platelet counts, and hematocrit levels. Warning signs of severe dengue (severe abdominal pain, persistent vomiting, mucosal bleeding) require immediate hospitalization for intravenous fluid replacement and potential blood transfusion support."
  },
  {
    keywords: ["thyroid", "thyroid disorder", "hormone imbalance"],
    expandedDescription: "Patient has been diagnosed with a thyroid disorder, a condition affecting the thyroid gland's ability to produce hormones that regulate metabolism, energy, and growth. This can manifest as hypothyroidism (underactive thyroid) causing fatigue, weight gain, cold sensitivity, and depression, or hyperthyroidism (overactive thyroid) causing weight loss, rapid heartbeat, anxiety, and heat sensitivity. Other symptoms may include changes in hair texture, skin dryness, menstrual irregularities, and mood changes. Causes include autoimmune diseases, iodine deficiency, medications, or thyroid nodules. Treatment involves hormone replacement therapy for hypothyroidism or medications to reduce hormone production for hyperthyroidism. Regular monitoring and medication adjustment are essential for optimal management.",
    expandedTreatment: "Treatment depends on the specific thyroid disorder. Hypothyroidism is treated with daily hormone replacement therapy using synthetic levothyroxine (T4), taken on an empty stomach. Dosage is adjusted based on TSH levels monitored every 6-8 weeks until stable. Hyperthyroidism treatment options include anti-thyroid medications (Methimazole, Propylthiouracil) to block hormone production, radioactive iodine therapy to shrink the thyroid, or thyroidectomy (surgical removal). Beta-blockers may be used temporarily to manage symptoms like rapid heart rate. For autoimmune thyroid conditions (Hashimoto's, Graves'), long-term monitoring is required. Dietary iodine management may also be relevant."
  },
  {
    keywords: ["urinary tract infection", "uti", "bacterial infection of urinary system"],
    expandedDescription: "Patient has developed a urinary tract infection (UTI), a bacterial infection affecting any part of the urinary system including the kidneys, ureters, bladder, or urethra. Most infections involve the lower urinary tract (bladder and urethra). Symptoms include a strong, persistent urge to urinate, burning sensation during urination, cloudy or strong-smelling urine, pelvic pain, and frequent passage of small amounts of urine. If the infection reaches the kidneys, it can cause fever, back pain, nausea, and vomiting. UTIs are more common in women and are typically caused by E. coli bacteria. Treatment involves antibiotics, increased fluid intake, and proper hygiene. Untreated UTIs can lead to kidney infections and complications.",
    expandedTreatment: "Uncomplicated UTIs are treated with a short course of oral antibiotics such as Nitrofurantoin, Trimethoprim-sulfamethoxazole, or Fosfomycin, typically for 3-5 days. Choice of antibiotic depends on local resistance patterns and patient history. Phenazopyridine may be prescribed for a few days to relieve burning and urgency (note: turns urine orange). Patients are advised to increase water intake to help flush out bacteria. For recurrent UTIs, low-dose prophylactic antibiotics or post-coital antibiotics may be considered. Complicated UTIs or kidney infections (pyelonephritis) may require longer courses (7-14 days) or intravenous antibiotics (e.g., Ceftriaxone, Ciprofloxacin)."
  },
  {
    keywords: ["anemia", "anaemia", "low hemoglobin"],
    expandedDescription: "Patient has been diagnosed with anemia, a condition characterized by a deficiency of red blood cells or hemoglobin in the blood, resulting in reduced oxygen delivery to body tissues. Common symptoms include fatigue, weakness, pale skin, shortness of breath, dizziness, cold hands and feet, irregular heartbeat, and headaches. Causes vary and include iron deficiency, vitamin B12 or folate deficiency, chronic diseases, blood loss, genetic disorders, or bone marrow problems. The most common type is iron-deficiency anemia. Treatment depends on the underlying cause and may include dietary changes, iron or vitamin supplements, medications, or in severe cases, blood transfusions. Left untreated, anemia can lead to serious complications including heart problems and pregnancy complications.",
    expandedTreatment: "Treatment of anemia is directed at the underlying cause. Iron-deficiency anemia is treated with oral iron supplements (Ferrous Sulfate/Gluconate) taken with Vitamin C to enhance absorption, and dietary increase of iron-rich foods (red meat, leafy greens). Vitamin deficiency anemias require B12 injections or oral folic acid supplements. Anemia of chronic disease involves treating the underlying condition and sometimes using Erythropoiesis-Stimulating Agents (ESAs). Severe anemia with hemodynamic instability requires red blood cell transfusion. If blood loss is the cause (e.g., heavy menstruation, GI bleed), the source must be identified and treated."
  },
  {
    keywords: ["appendicitis", "inflammation of appendix"],
    expandedDescription: "Patient has been diagnosed with appendicitis, a medical emergency involving inflammation of the appendix, a small pouch attached to the large intestine. This condition typically begins with sudden pain around the navel that shifts to the lower right abdomen, becoming increasingly severe. Other symptoms include nausea, vomiting, loss of appetite, low-grade fever, constipation or diarrhea, abdominal bloating, and inability to pass gas. The exact cause is often unclear but may involve blockage by stool, foreign bodies, or infection. Appendicitis requires immediate medical attention as a ruptured appendix can lead to peritonitis, a life-threatening infection. Treatment almost always involves surgical removal of the appendix (appendectomy), either through traditional open surgery or laparoscopic procedure. Antibiotics are administered to prevent infection.",
    expandedTreatment: "The standard treatment for appendicitis is an appendectomy, the surgical removal of the appendix. This is typically performed as a laparoscopic (minimally invasive) procedure, allowing for faster recovery and less pain, though open surgery may be required for ruptured appendix or complex cases. Pre-operative antibiotics are administered to prevent wound infection and intra-abdominal abscesses. In some select cases of uncomplicated appendicitis, a non-operative approach with antibiotics alone may be considered, but surgery remains the gold standard to prevent recurrence. Pain management and fluid resuscitation are provided pre- and post-operatively."
  }
];

/**
 * Finds a matching expansion mapping for a given disease name or description
 */
function findMatchingMapping(diseaseName: string, diseaseDescription: string): ExpansionMapping | null {
  const searchText = `${diseaseName} ${diseaseDescription}`.toLowerCase();

  for (const mapping of expansionMappings) {
    for (const keyword of mapping.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return mapping;
      }
    }
  }

  return null;
}

/**
 * Main function to update disease descriptions in the database
 */
async function updateDescriptions() {
  try {
    console.log("🔄 Starting disease description and treatment update...\n");

    // Connect to database
    await connectDb();
    console.log("✅ Connected to database\n");

    // Fetch all health records
    const records = await HealthRecords.find({});
    console.log(`📊 Found ${records.length} health records to process\n`);

    let updatedCount = 0;
    let skippedCount = 0;
    const updateLog: { disease: string; matched: string }[] = [];

    // Process each record
    for (const record of records) {
      const mapping = findMatchingMapping(record.diseaseName, record.diseaseDescription);

      if (mapping) {
        // Update the record with expanded description AND treatment
        await HealthRecords.updateOne(
          { _id: record._id },
          { 
            $set: { 
              diseaseDescription: mapping.expandedDescription,
              treatment: mapping.expandedTreatment
            } 
          }
        );

        updatedCount++;
        updateLog.push({
          disease: record.diseaseName,
          matched: mapping.keywords[0]
        });

        console.log(`✓ Updated: ${record.diseaseName}`);
      } else {
        skippedCount++;
        console.log(`⊘ Skipped: ${record.diseaseName} (no mapping found)`);
      }
    }

    // Print summary
    console.log("\n" + "=".repeat(60));
    console.log("📈 UPDATE SUMMARY");
    console.log("=".repeat(60));
    console.log(`Total records processed: ${records.length}`);
    console.log(`✅ Successfully updated: ${updatedCount}`);
    console.log(`⊘ Skipped (no mapping): ${skippedCount}`);
    console.log("=".repeat(60));

    if (updateLog.length > 0) {
      console.log("\n📋 Updated Diseases:");
      const diseaseGroups = updateLog.reduce((acc, item) => {
        if (!acc[item.matched]) {
          acc[item.matched] = 0;
        }
        acc[item.matched]++;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(diseaseGroups).forEach(([disease, count]) => {
        console.log(`   • ${disease}: ${count} record(s)`);
      });
    }

    console.log("\n🎉 Disease description and treatment update completed successfully!");
    process.exit(0);

  } catch (error) {
    console.error("\n❌ Error updating descriptions:", error);
    process.exit(1);
  }
}

// Run the update
updateDescriptions();