import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return reverse string', () => {
    const pipe = new ReversePipe()
    const rta = pipe.transform('roma')
    expect(rta).toBe('amor')
  })
});
