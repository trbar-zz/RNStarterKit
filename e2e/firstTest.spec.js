describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have home screen text', async () => {
    await expect(element(by.id('homeText'))).toBeVisible();
  });
})
