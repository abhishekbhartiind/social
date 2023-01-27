import "@tensorflow/tfjs"
import { ToxicityClassifier, load } from '@tensorflow-models/toxicity'
import { useEffect, useState } from 'react';

const threshold = 0.9;

type labels = {
    [key: string]: string,
}
const toxicityLabels: labels = {
    'toxicity': 'toxic',
    'insult': 'insulting',
    'threat': 'threatening',
    'obscene': 'obscene',
    'sexual_explicit': 'sexually explicit',
    'identity_attack': 'identity-attacking'
}

export const useToxicTextDetector = () => {
    const [model, setModel] = useState<ToxicityClassifier | null>(
        null
    );

    useEffect(() => {
        load(
            threshold,
            Object.keys(toxicityLabels)
        ).then(model => {
            setModel(model);
        })
    }, []);

    const detectToxicity = async (sentence: string) => {
        if (model) {
            const toxicities = await model.classify(sentence);
            const detectedResults: string[] = [];
            toxicities.forEach(({ label, results }) => {
                if (results[0].match) {
                    detectedResults.push(label);
                } else {
                    return;
                }
            })
            return detectedResults;
        } else {
            return null;
        }
    }

    const getWarningForToxicText = async (sentence: string) => {
        const toxicResults = await detectToxicity(sentence);
        if (toxicResults && toxicResults.length > 0) {
            const toxicDescriptors = toxicResults.map((label) => toxicityLabels[label]);
            let warning = toxicDescriptors.join(', ');
            warning = warning.substring(0, warning.length);
            return warning + ' text is detected!!'
        } else {
            return '';
        }
    }

    return {
        detectToxicity,
        getWarningForToxicText
    }
}