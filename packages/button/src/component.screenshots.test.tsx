import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    customSnapshotIdentifier,
    generateTestCases,
    createSpriteStorybookUrl,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 200, height: 100 };

describe(
    'Button | views & sizes',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
                        size: ['xxs', 'xs', 's', 'm', 'l', 'xl'],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe('Button | views & themes', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Button',
                        knobs: {
                            children: 'Оплатить',
                            view: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
                            disabled: [false, true],
                        },
                        size: { width: 150, height: 80 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 1100,
                height: 240,
            },
            theme,
        })();

    ['default', 'click', 'corp', 'site', 'mobile'].map(testCase);
});

describe('Button | inverted views & themes', () => {
    const testCase = (theme: string) =>
        screenshotTesting({
            cases: [
                [
                    `${theme} theme`,
                    createSpriteStorybookUrl({
                        componentName: 'Button',
                        knobs: {
                            children: 'Оплатить',
                            view: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
                            disabled: [false, true],
                            colors: 'inverted',
                        },
                        size: { width: 150, height: 80 },
                    }),
                ],
            ],
            screenshotOpts: {
                fullPage: true,
            },
            viewport: {
                width: 1100,
                height: 240,
            },
            theme,
        })();

    ['default', 'click', 'corp', 'site', 'mobile'].map(testCase);
});

describe(
    'Button | screenshots views and block',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 500, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
                        block: true,
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Button | screenshots views and loading',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
                loading: true,
            },
        }),
        evaluate: (page: Page) => page.waitForTimeout(300),
        matchImageSnapshotOptions: {
            failureThresholdType: 'percent',
            failureThreshold: 0.1,
        },
        screenshotOpts: { clip },
    }),
);

describe(
    'Button | screenshots hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
                colors: ['default', 'inverted'],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) => page.hover('button').then(() => page.waitForTimeout(500)),
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);

describe(
    'Button | screenshots pressed state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
                colors: ['default', 'inverted'],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) => {
            return page.mouse
                .move(30, 30)
                .then(() => page.mouse.down().then(() => page.waitForTimeout(500)));
        },
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);
