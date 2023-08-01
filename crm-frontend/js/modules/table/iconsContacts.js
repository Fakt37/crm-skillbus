export const createContactsList = (client) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('contacts__wrapper');
    const maxIconsToShow = 4;
    let showAllContacts = false;
    let remainingContacts = client.contacts.length - maxIconsToShow;

    const contactTypes = {
        phone: 'images/sprite.svg#phone',
        otherPhone: 'images/sprite.svg#other',
        email: 'images/sprite.svg#email',
        vk: 'images/sprite.svg#vk',
        fb: 'images/sprite.svg#fb',
    };

    const createIcon = (contact) => {
        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('contacts__icon-wrapper');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('contacts__icon');

        // Добавляем обработчик события для отображения tooltip при наведении
        iconWrapper.addEventListener('mouseenter', () => {
            const tooltip = createTooltip(contact);
            iconWrapper.appendChild(tooltip);
        });

        // Удаляем tooltip при уходе курсора мыши
        iconWrapper.addEventListener('mouseleave', () => {
            const tooltip = iconWrapper.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });

        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS(
            'http://www.w3.org/1999/xlink',
            'xlink:href',
            contactTypes[contact.type],
        );
        svg.appendChild(use);
        iconWrapper.appendChild(svg);
        return iconWrapper;
    };

    const updateIcons = () => {
        wrapper.innerHTML = '';

        client.contacts.forEach((contact, index) => {
            if (!showAllContacts && index >= maxIconsToShow) {
                return;
            }
            if (contactTypes.hasOwnProperty(contact.type)) {
                const iconWrapper = createIcon(contact);
                wrapper.appendChild(iconWrapper);
            }
        });

        remainingContacts = client.contacts.length - maxIconsToShow;

        if (remainingContacts > 0 && !showAllContacts) {
            const remainingCount = document.createElement('span');
            remainingCount.classList.add('contacts__icon--current');
            remainingCount.textContent = `+${remainingContacts}`;
            remainingCount.addEventListener('click', () => {
                showAllContacts = true;
                updateIcons();
                remainingCount.remove();
            });
            wrapper.appendChild(remainingCount);
        }
    };

    updateIcons();

    return wrapper;
};

function createTooltip(contact) {
    const tooltip = document.createElement('a');
    tooltip.classList.add('tooltip');
    tooltip.textContent = contact.value;

    const contactTypeMappings = {
        phone: 'tel',
        otherPhone: 'tel',
        email: 'mailto',
        vk: 'https://vk.com',
        fb: 'https://www.facebook.com/profile.php?id',
    };

    const contactType = contact.type;
    const contactValue = contact.value;
    const urlTemplate = contactTypeMappings[contactType];

    if (urlTemplate) {
        if (urlTemplate === 'tel' || urlTemplate === 'mailto') {
            const cleanedValue = contactValue.replace(/[\D-]+/g, '');
            tooltip.href = `${urlTemplate}:${cleanedValue}`;
        } else {
            tooltip.href = `${urlTemplate}/${contactValue}`;
        }
    }

    return tooltip;
}

