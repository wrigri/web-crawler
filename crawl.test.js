const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('check cases', () => {
    expect(normalizeURL('http://Example.Com/path')).toBe('example.com/path')
});

test('check cases', () => {
    expect(normalizeURL('http://google.com/path')).toBe('google.com/path')
});

test('check cases', () => {
    expect(normalizeURL('http://Example.Com/path/')).toBe('example.com/path')
});

test('check cases', () => {
    expect(normalizeURL('https://Example.Com/path')).toBe('example.com/path')
});

test('check cases', () => {
    expect(normalizeURL('http://Example.Com//path//')).toBe('example.com/path')
});

test('check cases', () => {
    expect(normalizeURL('http://Example.Com/')).toBe('example.com/')
});

test('check cases', () => {
    expect(normalizeURL('http://Example.Com')).toBe('example.com/')
});