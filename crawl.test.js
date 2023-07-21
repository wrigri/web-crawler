const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('check cases', () => {
    expect(normalizeURL('http://Example.Com/path')).toBe('example.com/path')
});

test('check normalize other domains', () => {
    expect(normalizeURL('http://google.com/path')).toBe('google.com/path')
});

test('check normalize end slash', () => {
    expect(normalizeURL('http://Example.Com/path/')).toBe('example.com/path')
});

test('check normalize protocol', () => {
    expect(normalizeURL('https://Example.Com/path')).toBe('example.com/path')
});

test('check normalize double slashes', () => {
    expect(normalizeURL('http://Example.Com//path//')).toBe('example.com/path')
});

test('check normalize empty path', () => {
    expect(normalizeURL('http://Example.Com/')).toBe('example.com/')
});

test('check cases', () => {
    expect(normalizeURL('http://Example.Com')).toBe('example.com/')
});

test('test getURLsFromHTML', () => {
    const body = `
    <H1>This is a title</H1>
    <br>
    <br>
    You can click on these links:<br>
    <a href="https://example.com/">Example.com</a>
    <br>
    <a href="/path/to/something/">Path</a>
    <br>
    <a href="https://google.com/">Google</a>
    <br>
    <a href="https://example.com/path/to/something/else">Path 2</a>
    <br>
    `
    const base = 'https://example.com/'
    const expArr = [
        'https://example.com/',
        'https://example.com/path/to/something/',
        'https://google.com/',
        'https://example.com/path/to/something/else',
    ]
    expect(getURLsFromHTML(body, base)).toEqual(expArr)
});